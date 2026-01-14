const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'public/images/products');
const categoryDir = path.join(__dirname, 'public/images/categories');
const productDir = path.join(__dirname, 'public/images/products');

// Ensure directories exist
if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });
if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

const mappings = [
    {
        source: 'ceremonial-1.png', targets: [
            { dir: categoryDir, name: 'ceremonial.jpg' },
            { dir: productDir, name: 'ceremonial-1.jpg' },
            { dir: productDir, name: 'ceremonial-2.jpg' },
            { dir: productDir, name: 'ceremonial-3.jpg' }
        ]
    },
    {
        source: 'premium-1.png', targets: [
            { dir: categoryDir, name: 'premium.jpg' },
            { dir: productDir, name: 'premium-1.jpg' },
            { dir: productDir, name: 'premium-2.jpg' },
            { dir: productDir, name: 'premium-3.jpg' }
        ]
    },
    {
        source: 'culinary-1.png', targets: [
            { dir: categoryDir, name: 'culinary.jpg' },
            { dir: productDir, name: 'culinary-1.jpg' },
            { dir: productDir, name: 'culinary-2.jpg' },
            { dir: productDir, name: 'culinary-3.jpg' }
        ]
    },
    {
        source: 'latte-1.png', targets: [
            { dir: categoryDir, name: 'latte.jpg' },
            { dir: productDir, name: 'latte-1.jpg' },
            { dir: productDir, name: 'latte-2.jpg' },
            { dir: productDir, name: 'latte-3.jpg' }
        ]
    }
];

mappings.forEach(item => {
    const sourcePath = path.join(sourceDir, item.source);
    if (fs.existsSync(sourcePath)) {
        console.log(`Processing ${item.source}...`);
        item.targets.forEach(target => {
            const targetPath = path.join(target.dir, target.name);
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`  -> Created ${target.name}`);
        });
    } else {
        console.error(`❌ Source not found: ${item.source}`);
    }
});

console.log("✅ Image fix complete!");
