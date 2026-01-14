-- Insert remaining products to cover all available images

-- Ceremonial 3 (Using ceremonial-2.jpg, since ceremonialpremium is used by product 2)
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_cer_3', 'Reserve Ceremonial Matcha', 'reserve-ceremonial-matcha', 'Limited edition ceremonial matcha from a single estate in Uji.', 650000, 750000, 'CEREMONIAL', 'Rich, Full-bodied, Vegetal', 'Uji, Kyoto, Japan', 20, 15, ARRAY['/images/products/ceremonial-2.jpg'], false, 'cat_1', NOW(), NOW());

-- Premium 2
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_prem_2', 'Premium Matcha - Organic', 'premium-matcha-organic', 'JAS certified organic premium matcha.', 320000, NULL, 'PREMIUM', 'Clean, Vegetal, Mild', 'Kagoshima, Japan', 50, 75, ARRAY['/images/products/premium-2.jpg'], true, 'cat_2', NOW(), NOW());

-- Premium 3
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_prem_3', 'Premium Blend Matcha', 'premium-blend-matcha', 'A carefully crafted blend of premium cultivars.', 240000, 280000, 'PREMIUM', 'Well-rounded, Grassy, Sweet', 'Shizuoka, Japan', 50, 120, ARRAY['/images/products/premium-3.jpg'], false, 'cat_2', NOW(), NOW());

-- Premium 4 (New product for premium-4.jpg)
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_prem_4', 'Master Select Premium', 'master-select-premium', 'Exclusive selection by our tea masters.', 290000, 350000, 'PREMIUM', 'Deep, Aromatic, smooth', 'Nishio, Japan', 40, 60, ARRAY['/images/products/premium-4.jpg'], true, 'cat_2', NOW(), NOW());

-- Culinary 2 (Using culinary2.jpg)
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_cul_2', 'Culinary Matcha - Cooking Grade', 'culinary-cooking-grade', 'Versatile culinary matcha ideal for savory applications.', 150000, 180000, 'CULINARY', 'Robust, Vegetal, Versatile', 'Japan', 100, 180, ARRAY['/images/products/culinary2.jpg'], false, 'cat_3', NOW(), NOW());

-- Latte 2
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_lat_2', 'Cafe Latte Matcha Blend', 'cafe-latte-matcha-blend', 'A cafe-style matcha blend designed for milk-based drinks.', 195000, 230000, 'LATTE', 'Mild, Balanced, Milk-friendly', 'Japan', 80, 130, ARRAY['/images/products/latte-2.jpg'], true, 'cat_4', NOW(), NOW());

-- Latte 3
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_lat_3', 'Iced Matcha Blend', 'iced-matcha-blend', 'Optimized for cold drinks, this matcha dissolves easily.', 210000, NULL, 'LATTE', 'Refreshing, Light, Smooth', 'Japan', 80, 90, ARRAY['/images/products/latte-3.jpg'], false, 'cat_4', NOW(), NOW());

-- Latte 4 (New product for latte-4.jpg)
INSERT INTO "products" (id, name, slug, description, price, "comparePrice", grade, flavor, origin, weight, stock, images, featured, "categoryId", "createdAt", "updatedAt") VALUES
('prod_lat_4', 'Sweet Matcha Mix', 'sweet-matcha-mix', 'Pre-sweetened matcha mix for instant preparation.', 180000, NULL, 'LATTE', 'Sweet, Easy, Delicious', 'Japan', 200, 100, ARRAY['/images/products/latte-4.jpg'], true, 'cat_4', NOW(), NOW());
