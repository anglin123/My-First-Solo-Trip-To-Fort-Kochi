const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure directory exists helper
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy file helper
function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${path.relative(__dirname, src)} -> ${path.relative(__dirname, dest)}`);
}

// Copy directory recursively helper
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`Copied directory: ${path.relative(__dirname, src)} -> ${path.relative(__dirname, dest)}`);
}

async function build() {
  console.log('Starting build...');
  
  ensureDir(DIST_DIR);
  ensureDir(path.join(DIST_DIR, 'css'));
  ensureDir(path.join(DIST_DIR, 'js'));
  ensureDir(path.join(DIST_DIR, 'assets'));

  // Copy CSS and JS
  const styleCssSrc = path.join(SRC_DIR, 'css', 'style.css');
  const styleCssDest = path.join(DIST_DIR, 'css', 'style.css');
  if (fs.existsSync(styleCssSrc)) {
    copyFile(styleCssSrc, styleCssDest);
  } else {
    console.warn('Warning: src/css/style.css not found.');
  }

  const appJsSrc = path.join(SRC_DIR, 'js', 'app.js');
  const appJsDest = path.join(DIST_DIR, 'js', 'app.js');
  if (fs.existsSync(appJsSrc)) {
    copyFile(appJsSrc, appJsDest);
  } else {
    console.warn('Warning: src/js/app.js not found.');
  }

  // Copy assets if they exist
  const assetsSrc = path.join(SRC_DIR, 'assets');
  const assetsDest = path.join(DIST_DIR, 'assets');
  if (fs.existsSync(assetsSrc)) {
    copyDir(assetsSrc, assetsDest);
  }

  // Render Index EJS
  const indexEjsPath = path.join(SRC_DIR, 'views', 'index.ejs');
  if (fs.existsSync(indexEjsPath)) {
    try {
      const html = await ejs.renderFile(indexEjsPath, {
        // We can pass data to templates here if needed
        buildTime: new Date().toISOString()
      });
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf8');
      console.log('Successfully compiled index.html');
    } catch (err) {
      console.error('Error rendering index.ejs:', err);
      process.exit(1);
    }
  } else {
    console.error('Error: src/views/index.ejs not found.');
    process.exit(1);
  }
  
  console.log('Build completed successfully!');
}

build();
