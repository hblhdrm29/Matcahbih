-- Update Categories to use existing JPG copies or correct PNGs
-- Categories (renamed to match my fix_images.js output, or pointing to PNGs if preferred)
-- The fix_images.js script created .jpg files in categories folder, so let's stick to .jpg for categories as they exist now.
UPDATE "categories" SET image = '/images/categories/ceremonial.jpg' WHERE slug = 'ceremonial-grade';
UPDATE "categories" SET image = '/images/categories/premium.jpg' WHERE slug = 'premium-grade';
UPDATE "categories" SET image = '/images/categories/culinary.jpg' WHERE slug = 'culinary-grade';
UPDATE "categories" SET image = '/images/categories/latte.jpg' WHERE slug = 'matcha-latte';

-- Update Products to use the ACTUAL files found in the directory
-- Ceremonial (Using PNG for the main image, and existing JPGs for others)
UPDATE "products" SET images = ARRAY['/images/products/ceremonial-1.png', '/images/products/ceremonial-2.jpg'] WHERE slug = 'uji-ceremonial-first-harvest';
-- Note: 'ceremonial-3.jpg' was not found in the file list, using ceremonial-2.jpg as fallback or removing it.
UPDATE "products" SET images = ARRAY['/images/products/ceremonial-2.jpg'] WHERE slug = 'ceremonial-okumidori';

-- Premium
UPDATE "products" SET images = ARRAY['/images/products/premium-1.png'] WHERE slug = 'daily-premium-matcha';
-- Note: premium-2.jpg exists
UPDATE "products" SET images = ARRAY['/images/products/premium-2.jpg'] WHERE slug = 'premium-matcha-organic';
-- Note: premium-3.jpg exists
UPDATE "products" SET images = ARRAY['/images/products/premium-3.jpg'] WHERE slug = 'premium-blend-matcha';

-- Culinary
UPDATE "products" SET images = ARRAY['/images/products/culinary-1.png'] WHERE slug = 'culinary-bakers-choice';
-- Note: culinary2.jpg exists (no dash)
UPDATE "products" SET images = ARRAY['/images/products/culinary2.jpg'] WHERE slug = 'culinary-cooking-grade';
-- Note: culinary-3.jpg does NOT exist, reusing culinary-1.png
UPDATE "products" SET images = ARRAY['/images/products/culinary-1.png'] WHERE slug = 'culinary-value-pack';

-- Latte
UPDATE "products" SET images = ARRAY['/images/products/latte-1.png'] WHERE slug = 'latte-grade-matcha';
-- Note: latte-2.jpg exists
UPDATE "products" SET images = ARRAY['/images/products/latte-2.jpg'] WHERE slug = 'cafe-latte-matcha-blend';
-- Note: latte-3.jpg exists
UPDATE "products" SET images = ARRAY['/images/products/latte-3.jpg'] WHERE slug = 'iced-matcha-blend';
