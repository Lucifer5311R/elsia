-- Clear existing data (optional, remove if you want to keep existing)
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.categories CASCADE;

-- Insert Categories (Explicitly include created_at)
INSERT INTO public.categories (name, slug, image_url, created_at) VALUES
('Hamper', 'hamper', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop', NOW()),
('Single Items', 'single-unique-gifts', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop', NOW());

-- Insert Products (Explicitly include created_at)
INSERT INTO public.products (name, slug, description, price, category_id, image_url, is_featured, is_sale, created_at) VALUES
-- Hamper Category
(
  'Luxury Gift Hamper',
  'luxury-gift-hamper',
  'A curated collection of handmade delights including chocolates, a mini frame, and scented candles.',
  2499,
  (SELECT id FROM public.categories WHERE slug = 'hamper'),
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop',
  true,
  false,
  NOW()
),
(
  'Birthday Surprise Box',
  'birthday-surprise-box',
  'The perfect birthday gift with polaroids, a custom card, and sweet treats.',
  1899,
  (SELECT id FROM public.categories WHERE slug = 'hamper'),
  'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=2000&auto=format&fit=crop',
  true,
  true,
  NOW()
),

-- Single Items Category
(
  'Handmade Rose Bouquet',
  'handmade-rose-bouquet',
  'Beautiful paper roses that last forever. Perfect for anniversaries.',
  1299,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2000&auto=format&fit=crop',
  true,
  false,
  NOW()
),
(
  'Custom Polaroid Set (10 pcs)',
  'custom-polaroid-set',
  'High-quality retro style prints of your favorite memories.',
  499,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=2000&auto=format&fit=crop',
  true,
  false,
  NOW()
),
(
  'Decor Frame (A4)',
  'decor-frame-a4',
  'Minimalist wooden frame for your wall or desk.',
  899,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=2000&auto=format&fit=crop',
  false,
  false,
  NOW()
),
(
  'Mini Desk Frame',
  'mini-desk-frame',
  'Cute small frame perfect for office desks.',
  399,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=2000&auto=format&fit=crop',
  false,
  false,
  NOW()
),
(
  'Amigurumi Doll',
  'amigurumi-doll',
  'Hand-crocheted cute doll, safe for kids and perfect for collectors.',
  1499,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2000&auto=format&fit=crop',
  true,
  true,
  NOW()
),
(
  'Resin Alphabet Key Chain',
  'resin-alphabet-key-chain',
  'Customizable letter key chain with floral inclusions.',
  299,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2000&auto=format&fit=crop',
  false,
  false,
  NOW()
),
(
  'Silk Thread Bangles Set',
  'silk-thread-bangles-set',
  'Traditional handmade bangles in vibrant colors.',
  699,
  (SELECT id FROM public.categories WHERE slug = 'single-unique-gifts'),
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop',
  false,
  true,
  NOW()
);
