const fs = require('fs');
const path = require('path');

const srcDir = '/Users/suvendusahoo/.gemini/antigravity/brain/8c795802-5790-44be-b759-e8959103619b/';
const destDir = path.join(__dirname, 'public', 'images', 'generated');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.jpg')) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file}`);
  }
});
