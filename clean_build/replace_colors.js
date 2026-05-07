const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace heading colors
  content = content.replace(/text-slate-950/g, 'text-gray-900 dark:text-white');
  content = content.replace(/text-slate-900/g, 'text-gray-900 dark:text-white');
  
  // Replace body colors
  content = content.replace(/text-slate-700/g, 'text-gray-600 dark:text-gray-300');
  content = content.replace(/text-slate-600/g, 'text-gray-600 dark:text-gray-300');
  
  // Replace lighter grays
  content = content.replace(/text-slate-500/g, 'text-gray-500 dark:text-gray-400');
  content = content.replace(/text-slate-400/g, 'text-gray-400 dark:text-gray-500');

  // Also replace some bg-white/60 with dark mode alternatives if needed, but let's stick to text for now
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      replaceInFile(filePath);
    }
  }
}

walkDir(dir);
