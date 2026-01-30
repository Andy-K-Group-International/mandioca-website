export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hostels: {
        Row: {
          id: string
          name: string
          slug: string
          city: string
          country: string
          address: string
          description: string
          short_description: string | null
          rating: number | null
          hero_image: string | null
          latitude: number | null
          longitude: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          city: string
          country: string
          address: string
          description: string
          short_description?: string | null
          rating?: number | null
          hero_image?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          city?: string
          country?: string
          address?: string
          description?: string
          short_description?: string | null
          rating?: number | null
          hero_image?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          hostel_id: string
          name: string
          description: string | null
          bed_count: number
          room_type: 'dorm' | 'private' | 'suite'
          price_per_night: number
          max_guests: number
          image_url: string | null
          available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          hostel_id: string
          name: string
          description?: string | null
          bed_count?: number
          room_type?: 'dorm' | 'private' | 'suite'
          price_per_night?: number
          max_guests?: number
          image_url?: string | null
          available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          hostel_id?: string
          name?: string
          description?: string | null
          bed_count?: number
          room_type?: 'dorm' | 'private' | 'suite'
          price_per_night?: number
          max_guests?: number
          image_url?: string | null
          available?: boolean
          created_at?: string
        }
      }
      amenities: {
        Row: {
          id: string
          hostel_id: string
          name: string
          icon: string | null
          category: 'facility' | 'service' | 'activity'
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          hostel_id: string
          name: string
          icon?: string | null
          category?: 'facility' | 'service' | 'activity'
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          hostel_id?: string
          name?: string
          icon?: string | null
          category?: 'facility' | 'service' | 'activity'
          description?: string | null
          created_at?: string
        }
      }
      hostel_images: {
        Row: {
          id: string
          hostel_id: string
          image_url: string
          alt_text: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          hostel_id: string
          image_url: string
          alt_text?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          hostel_id?: string
          image_url?: string
          alt_text?: string | null
          display_order?: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          hostel_id: string
          room_id: string
          guest_name: string
          guest_email: string
          guest_phone: string | null
          check_in: string
          check_out: string
          guest_count: number
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          hostel_id: string
          room_id: string
          guest_name: string
          guest_email: string
          guest_phone?: string | null
          check_in: string
          check_out: string
          guest_count?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          hostel_id?: string
          room_id?: string
          guest_name?: string
          guest_email?: string
          guest_phone?: string | null
          check_in?: string
          check_out?: string
          guest_count?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          hostel_id: string
          guest_name: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          hostel_id: string
          guest_name: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          hostel_id?: string
          guest_name?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Hostel = Database['public']['Tables']['hostels']['Row']
export type Room = Database['public']['Tables']['rooms']['Row']
export type Amenity = Database['public']['Tables']['amenities']['Row']
export type HostelImage = Database['public']['Tables']['hostel_images']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

export type NewBooking = Database['public']['Tables']['bookings']['Insert']
