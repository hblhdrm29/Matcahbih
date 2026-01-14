
-- Clean up
TRUNCATE TABLE "reviews", "cart_items", "order_items" CASCADE;
TRUNCATE TABLE "products", "categories" CASCADE;

-- Categories
INSERT INTO "categories" (id, name, slug, description, image, "createdAt", "updatedAt") VALUES
('cat_ceremonial', 'Ceremonial Grade', 'ceremonial-grade', 'The highest quality matcha, perfect for traditional tea ceremonies.', '/images/categories/ceremonial.jpg', NOW(), NOW()),
('cat_premium', 'Premium Grade', 'premium-grade', 'High-quality matcha suitable for daily consumption and lattes.', '/images/categories/premium.jpg', NOW(), NOW()),
('cat_culinary', 'Culinary Grade', 'culinary-grade', 'Robust flavor, ideal for baking, cooking, and smoothies.', '/images/categories/culinary.jpg', NOW(), NOW()),
('cat_latte', 'Matcha Latte', 'matcha-latte', 'Specially blended for delicious, creamy matcha lattes.', '/images/categories/latte.jpg', NOW(), NOW());

-- Products
-- Ceremonial
INSERT INTO "products" (id, name, slug, description, price, grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt")
VALUES
('prod_cer_1', 'Uji Ceremonial - First Harvest', 'uji-ceremonial-first-harvest', 'Hand-picked, stone-ground first harvest matcha from Uji. Vibrant green color and umami-rich flavor.', 450000, 'CEREMONIAL', 'Umami, Sweet, Creamy', 'Uji, Kyoto, Japan', 30, 50, ARRAY['/images/products/ceremonial-1.png', '/images/products/ceremonial-2.jpg'], true, 'cat_ceremonial', NOW(), NOW()),
('prod_cer_2', 'Ceremonial Okumidori', 'ceremonial-okumidori', 'Single-cultivar Okumidori matcha. Distinctive rich aroma and smooth texture.', 520000, 'CEREMONIAL', 'Rich, Smooth, Nutty', 'Nishio, Japan', 30, 30, ARRAY['/images/products/ceremonial-2.jpg'], false, 'cat_ceremonial', NOW(), NOW()),
('prod_cer_3', 'Reserve Ceremonial Matcha', 'reserve-ceremonial-matcha', 'Limited edition ceremonial matcha from a single estate in Uji.', 650000, 'CEREMONIAL', 'Rich, Full-bodied, Vegetal', 'Uji, Kyoto, Japan', 20, 15, ARRAY['/images/products/ceremonialpremium_matcha.jpg'], false, 'cat_ceremonial', NOW(), NOW());

-- Premium
INSERT INTO "products" (id, name, slug, description, price, grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt")
VALUES
('prod_prem_1', 'Daily Premium Matcha', 'daily-premium-matcha', 'Perfect for your daily matcha ritual. Balanced flavor profile.', 280000, 'PREMIUM', 'Balanced, Light Astringency', 'Shizuoka, Japan', 50, 100, ARRAY['/images/products/premium-1.png'], false, 'cat_premium', NOW(), NOW()),
('prod_prem_2', 'Premium Matcha - Organic', 'premium-matcha-organic', 'JAS certified organic premium matcha.', 320000, 'PREMIUM', 'Clean, Vegetal, Mild', 'Kagoshima, Japan', 50, 75, ARRAY['/images/products/premium-2.jpg'], true, 'cat_premium', NOW(), NOW()),
('prod_prem_3', 'Premium Blend Matcha', 'premium-blend-matcha', 'A carefully crafted blend of premium cultivars.', 240000, 'PREMIUM', 'Well-rounded, Grassy, Sweet', 'Shizuoka, Japan', 50, 120, ARRAY['/images/products/premium-3.jpg'], false, 'cat_premium', NOW(), NOW()),
('prod_prem_4', 'Master Select Premium', 'master-select-premium', 'Exclusive selection by our tea masters.', 290000, 'PREMIUM', 'Deep, Aromatic, smooth', 'Nishio, Japan', 40, 60, ARRAY['/images/products/premium-4.jpg'], true, 'cat_premium', NOW(), NOW());

-- Culinary
INSERT INTO "products" (id, name, slug, description, price, grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt")
VALUES
('prod_cul_1', 'Culinary - Baker''s Choice', 'culinary-bakers-choice', 'Strong matcha flavor that stands out in baked goods.', 120000, 'CULINARY', 'Strong, Bold', 'Japan', 100, 200, ARRAY['/images/products/culinary-1.png'], false, 'cat_culinary', NOW(), NOW()),
('prod_cul_2', 'Culinary Matcha - Cooking Grade', 'culinary-cooking-grade', 'Versatile culinary matcha ideal for savory applications.', 150000, 'CULINARY', 'Robust, Vegetal, Versatile', 'Japan', 100, 180, ARRAY['/images/products/culinary2.jpg'], false, 'cat_culinary', NOW(), NOW()),
('prod_cul_3', 'Culinary Value Pack', 'culinary-value-pack', 'Great value for bulk cooking needs.', 250000, 'CULINARY', 'Standard, Bitter', 'Japan', 500, 50, ARRAY['/images/products/culinary-1.png'], false, 'cat_culinary', NOW(), NOW());

-- Latte
INSERT INTO "products" (id, name, slug, description, price, grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt")
VALUES
('prod_lat_1', 'Latte Grade Matcha', 'latte-grade-matcha', 'Designed to mix perfectly with milk for a smooth latte.', 180000, 'LATTE', 'Smooth, Sweet finish', 'Japan', 100, 150, ARRAY['/images/products/latte-1.png'], true, 'cat_latte', NOW(), NOW()),
('prod_lat_2', 'Cafe Latte Matcha Blend', 'cafe-latte-matcha-blend', 'A cafe-style matcha blend designed for milk-based drinks.', 195000, 'LATTE', 'Mild, Balanced, Milk-friendly', 'Japan', 80, 130, ARRAY['/images/products/latte-2.jpg'], true, 'cat_latte', NOW(), NOW()),
('prod_lat_3', 'Iced Matcha Blend', 'iced-matcha-blend', 'Optimized for cold drinks, this matcha dissolves easily.', 210000, 'LATTE', 'Refreshing, Light, Smooth', 'Japan', 80, 90, ARRAY['/images/products/latte-3.jpg'], false, 'cat_latte', NOW(), NOW()),
('prod_lat_4', 'Sweet Matcha Mix', 'sweet-matcha-mix', 'Pre-sweetened matcha mix for instant preparation.', 180000, 'LATTE', 'Sweet, Easy, Delicious', 'Japan', 200, 100, ARRAY['/images/products/latte-4.jpg'], true, 'cat_latte', NOW(), NOW());
