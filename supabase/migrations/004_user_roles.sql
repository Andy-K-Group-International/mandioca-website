-- Migration: User Roles System
-- Adds: staff_users table with role-based access control

-- ============================================
-- 1. STAFF USERS TABLE (Linked to Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Link to Supabase Auth (optional for backward compatibility)
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  -- User details
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  -- Role: 'admin' has full access, 'volunteer' has limited access
  role TEXT NOT NULL DEFAULT 'volunteer' CHECK (role IN ('admin', 'volunteer')),
  -- Status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  invited_by UUID REFERENCES staff_users(id),
  invited_at TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_staff_users_email ON staff_users(email);
CREATE INDEX IF NOT EXISTS idx_staff_users_auth_user ON staff_users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_staff_users_role ON staff_users(role);

-- ============================================
-- 2. ADD USER REFERENCE TO CLEANING TASKS
-- ============================================
-- Add staff_user_id column (nullable for backward compatibility)
ALTER TABLE cleaning_tasks
ADD COLUMN IF NOT EXISTS assigned_user_id UUID REFERENCES staff_users(id);

-- ============================================
-- 3. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on staff_users
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "Service role full access to staff_users" ON staff_users
FOR ALL USING (auth.role() = 'service_role');

-- Authenticated users can read their own profile
CREATE POLICY "Users can read own profile" ON staff_users
FOR SELECT USING (auth.uid() = auth_user_id);

-- Admins can read all staff users (via function)
CREATE POLICY "Admins can manage staff users" ON staff_users
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM staff_users
    WHERE auth_user_id = auth.uid()
    AND role = 'admin'
  )
);

-- ============================================
-- 4. CLEANING TASKS ACCESS FOR VOLUNTEERS
-- ============================================

-- Volunteers can view their assigned tasks
CREATE POLICY "Volunteers can view assigned tasks" ON cleaning_tasks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM staff_users
    WHERE auth_user_id = auth.uid()
    AND (
      role = 'admin'
      OR id = cleaning_tasks.assigned_user_id
    )
  )
);

-- Volunteers can update their assigned tasks
CREATE POLICY "Volunteers can update assigned tasks" ON cleaning_tasks
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM staff_users
    WHERE auth_user_id = auth.uid()
    AND (
      role = 'admin'
      OR id = cleaning_tasks.assigned_user_id
    )
  )
);

-- ============================================
-- 5. HELPER FUNCTIONS
-- ============================================

-- Function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM staff_users
  WHERE auth_user_id = auth.uid();

  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM staff_users
    WHERE auth_user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is volunteer
CREATE OR REPLACE FUNCTION is_volunteer()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM staff_users
    WHERE auth_user_id = auth.uid()
    AND role = 'volunteer'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 6. TRIGGER TO UPDATE updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_staff_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS staff_users_updated_at_trigger ON staff_users;
CREATE TRIGGER staff_users_updated_at_trigger
BEFORE UPDATE ON staff_users
FOR EACH ROW
EXECUTE FUNCTION update_staff_users_updated_at();
