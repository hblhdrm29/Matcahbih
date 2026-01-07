-- Seed Categories
INSERT INTO categories (id, name, slug, description, image, "createdAt", "updatedAt")
VALUES 
  ('cat_ceremonial', 'Ceremonial Grade', 'ceremonial-grade', 'Highest quality for traditional tea ceremony', '/images/categories/ceremonial.jpg', NOW(), NOW()),
  ('cat_premium', 'Premium Grade', 'premium-grade', 'Premium quality for daily enjoyment', '/images/categories/premium.jpg', NOW(), NOW()),
  ('cat_culinary', 'Culinary Grade', 'culinary-grade', 'Perfect for baking and cooking', '/images/categories/culinary.jpg', NOW(), NOW()),
  ('cat_latte', 'Matcha Latte', 'matcha-latte', 'Specially blended for lattes', '/images/categories/latte.jpg', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Seed Products
INSERT INTO products (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "isActive", "categoryId", "createdAt", "updatedAt")
VALUES 
  -- Ceremonial Grade Products
  ('prod_1', 'Uji Ceremonial Matcha - First Harvest', 'uji-ceremonial-first-harvest', 'Our finest ceremonial matcha, harvested in the first spring flush from the legendary tea gardens of Uji, Kyoto. Stone-ground to a silky smooth powder with a vibrant jade green color and naturally sweet umami flavor.', 450000, 550000, 'CEREMONIAL', 'Sweet, Umami, Creamy', 'Uji, Kyoto, Japan', 30, 50, ARRAY['/images/products/ceremonial-1.png'], true, true, 'cat_ceremonial', NOW(), NOW()),
  ('prod_2', 'Premium Ceremonial Matcha - Okumidori', 'ceremonial-okumidori', 'Single-cultivar ceremonial matcha made from the prized Okumidori variety. Known for its exceptionally smooth texture and complex flavor profile with hints of chestnut and cream.', 380000, NULL, 'CEREMONIAL', 'Nutty, Creamy, Complex', 'Uji, Kyoto, Japan', 30, 35, ARRAY['/images/products/ceremonial-1.png'], true, true, 'cat_ceremonial', NOW(), NOW()),
  ('prod_3', 'Reserve Ceremonial Matcha', 'reserve-ceremonial-matcha', 'Limited edition ceremonial matcha from a single estate in Uji. Perfect for koicha (thick tea) preparation with an intensely rich and full-bodied taste.', 650000, 750000, 'CEREMONIAL', 'Rich, Full-bodied, Vegetal', 'Uji, Kyoto, Japan', 20, 15, ARRAY['/images/products/ceremonial-1.png'], false, true, 'cat_ceremonial', NOW(), NOW()),
  
  -- Premium Grade Products
  ('prod_4', 'Daily Premium Matcha', 'daily-premium-matcha', 'High-quality everyday matcha perfect for your daily usucha. Vibrant color, smooth taste, and excellent value for quality-conscious matcha lovers.', 275000, 320000, 'PREMIUM', 'Balanced, Smooth, Fresh', 'Nishio, Aichi, Japan', 50, 100, ARRAY['/images/products/premium-1.png'], true, true, 'cat_premium', NOW(), NOW()),
  ('prod_5', 'Premium Matcha - Organic', 'premium-matcha-organic', 'JAS certified organic premium matcha. Grown without pesticides or chemical fertilizers, offering a pure and authentic matcha experience.', 320000, NULL, 'PREMIUM', 'Clean, Vegetal, Mild', 'Kagoshima, Japan', 50, 75, ARRAY['/images/products/premium-1.png'], true, true, 'cat_premium', NOW(), NOW()),
  ('prod_6', 'Premium Blend Matcha', 'premium-blend-matcha', 'A carefully crafted blend of premium cultivars, offering consistent quality and a well-rounded flavor profile perfect for both drinking and light cooking.', 240000, 280000, 'PREMIUM', 'Well-rounded, Grassy, Sweet', 'Shizuoka, Japan', 50, 120, ARRAY['/images/products/premium-1.png'], false, true, 'cat_premium', NOW(), NOW()),
  
  -- Culinary Grade Products
  ('prod_7', 'Culinary Matcha - Bakers Choice', 'culinary-bakers-choice', 'Professional-grade culinary matcha with robust flavor that stands up to baking. Perfect for matcha cookies, cakes, brownies, and other baked goods.', 180000, NULL, 'CULINARY', 'Strong, Bold, Earthy', 'Japan', 100, 200, ARRAY['/images/products/culinary-1.png'], true, true, 'cat_culinary', NOW(), NOW()),
  ('prod_8', 'Culinary Matcha - Cooking Grade', 'culinary-cooking-grade', 'Versatile culinary matcha ideal for savory applications. Use in pasta, sauces, dressings, and marinades for a unique matcha twist.', 150000, 180000, 'CULINARY', 'Robust, Vegetal, Versatile', 'Japan', 100, 180, ARRAY['/images/products/culinary-1.png'], false, true, 'cat_culinary', NOW(), NOW()),
  ('prod_9', 'Culinary Matcha - Value Pack', 'culinary-value-pack', 'Economy-sized culinary matcha for high-volume use. Perfect for cafes, bakeries, and enthusiastic home bakers who go through matcha quickly.', 350000, 420000, 'CULINARY', 'Consistent, Bold, Earthy', 'Japan', 250, 80, ARRAY['/images/products/culinary-1.png'], false, true, 'cat_culinary', NOW(), NOW()),
  
  -- Matcha Latte Products
  ('prod_10', 'Latte Grade Matcha', 'latte-grade-matcha', 'Specially formulated for the perfect matcha latte. Smooth, slightly sweet, and blends beautifully with milk or plant-based alternatives.', 220000, NULL, 'LATTE', 'Smooth, Sweet, Creamy', 'Japan', 80, 150, ARRAY['/images/products/latte-1.png'], true, true, 'cat_latte', NOW(), NOW()),
  ('prod_11', 'Cafe Latte Matcha Blend', 'cafe-latte-matcha-blend', 'A cafe-style matcha blend designed for milk-based drinks. Creates a beautiful green color and balanced matcha flavor in lattes, frappes, and smoothies.', 195000, 230000, 'LATTE', 'Mild, Balanced, Milk-friendly', 'Japan', 80, 130, ARRAY['/images/products/latte-1.png'], true, true, 'cat_latte', NOW(), NOW()),
  ('prod_12', 'Iced Matcha Blend', 'iced-matcha-blend', 'Optimized for cold drinks, this matcha dissolves easily in cold liquids. Perfect for iced lattes, cold brews, and refreshing summer beverages.', 210000, NULL, 'LATTE', 'Refreshing, Light, Smooth', 'Japan', 80, 90, ARRAY['/images/products/latte-1.png'], false, true, 'cat_latte', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
