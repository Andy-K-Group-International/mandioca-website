-- Seed data for ONEFAM Hostels website
-- Run this after creating the tables

-- Insert the Ribeira Porto hostel
INSERT INTO hostels (id, name, slug, city, country, address, description, short_description, rating, hero_image, latitude, longitude)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Ribeira ONEFAM Hostel Porto',
  'ribeira-onefam-hostel-porto',
  'Porto',
  'Portugal',
  'Rua da Fonte Taurina 99-101, 4050-269',
  'Welcome to Ribeira ONEFAM Hostel, your home away from home in the heart of Porto''s most enchanting neighborhood. Located in the historic Ribeira district, a UNESCO World Heritage site, our hostel offers the perfect blend of comfort, community, and authentic Portuguese charm.

Step outside and you''re immediately surrounded by colorful streets, stunning riverfront views, and the rich history that makes Porto one of Europe''s most beloved destinations. Whether you''re here to explore the famous wine cellars, wander through medieval alleyways, or simply soak in the vibrant atmosphere, our hostel is your perfect base.

At ONEFAM, we believe travel is about connections. Our welcoming common areas, daily activities, and family-style dinners create the perfect environment for meeting fellow travelers from around the world. Join our family and create memories that last a lifetime.',
  'Experience Porto like family in the heart of historic Ribeira',
  9.8,
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&q=80',
  41.1408,
  -8.6150
);

-- Insert rooms for Ribeira Porto hostel
INSERT INTO rooms (hostel_id, name, description, bed_count, room_type, price_per_night, max_guests, image_url, available)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '4 Bed Mixed Dorm', 'Perfect for solo travelers looking to meet new people. Features comfortable pod beds with privacy curtains, personal reading lights, and USB charging ports.', 4, 'dorm', 25.00, 1, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '6 Bed Dorm Ensuite', 'Our most popular room type with private bathroom. Enjoy the social atmosphere of a dorm with the convenience of an ensuite bathroom.', 6, 'dorm', 22.00, 1, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Private Double Room', 'Ideal for couples or friends traveling together. A cozy private room with a comfortable double bed and shared bathroom facilities.', 1, 'private', 65.00, 2, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Twin Private Ensuite', 'Perfect for friends who prefer separate beds. Features two single beds and a private ensuite bathroom for maximum comfort.', 2, 'private', 75.00, 2, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80', true);

-- Insert amenities for Ribeira Porto hostel
INSERT INTO amenities (hostel_id, name, icon, category, description)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Free WiFi', 'wifi', 'facility', 'High-speed internet throughout'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Common Areas', 'common_area', 'facility', 'Comfortable spaces to relax'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Laundry', 'laundry', 'service', 'Self-service laundry available'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Daily Activities', 'tours', 'activity', 'Walking tours & pub crawls'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '24/7 Reception', 'reception', 'service', 'Always here to help'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fully Equipped Kitchen', 'kitchen', 'facility', 'Cook your own meals'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Personal Lockers', 'lockers', 'facility', 'Secure storage included'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Luggage Storage', 'luggage', 'service', 'Free before/after check-in'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Family Dinners', 'dinner', 'activity', 'Weekly communal meals'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Pod Beds', 'pod_beds', 'facility', 'Privacy curtains & lights'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Air Conditioning', 'ac', 'facility', 'Climate controlled rooms'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rooftop Terrace', 'terrace', 'facility', 'Amazing city views');

-- Insert hostel images
INSERT INTO hostel_images (hostel_id, image_url, alt_text, display_order)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&q=80', 'Hostel common area with travelers', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80', 'Beautiful Porto riverside view', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&q=80', 'Modern hostel bedroom', 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80', 'Rooftop terrace with city views', 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', 'Hostel interior', 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80', 'Porto streets', 6);

-- Insert sample reviews
INSERT INTO reviews (hostel_id, guest_name, rating, comment)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sarah M.', 10, 'Absolutely amazing hostel! The staff was incredibly friendly and helpful. The location in Ribeira is perfect - right by the river with stunning views. Made so many friends at the family dinner. Will definitely come back!'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Marco B.', 10, 'Best hostel experience ever! Super clean, great atmosphere, and the activities were fantastic. The walking tour showed us hidden spots we never would have found on our own. 10/10 recommend!'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Emma L.', 9, 'Such a welcoming place! The pod beds are super comfy with great privacy. Loved the rooftop terrace views of Porto. The pub crawl was a highlight - met travelers from all over the world.'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Alex K.', 10, 'This hostel feels like home. The kitchen is well-equipped, the common areas are perfect for meeting people, and the staff genuinely cares about making your stay special. Porto is incredible and this is the perfect base!'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Julia W.', 10, 'Traveled solo and felt immediately welcomed. The family dinners are such a great idea - authentic Portuguese food and wonderful conversations. Already planning my return trip!');
