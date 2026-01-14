-- Fix Ceremonial Products Images

-- 1. Uji Ceremonial Matcha - First Harvest
-- Remove the double image, keep only ceremonial-1.png
UPDATE "products" SET images = ARRAY['/images/products/ceremonial-1.png'] WHERE slug = 'uji-ceremonial-first-harvest';

-- 2. Premium Ceremonial Matcha - Okumidori
-- Use the specific user-provided file: ceremonialpremium_matcha.jpg
UPDATE "products" SET images = ARRAY['/images/products/ceremonialpremium_matcha.jpg'] WHERE slug = 'ceremonial-okumidori';
