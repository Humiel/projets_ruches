const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

function checkEJS(filePath) {
  try {
    const str = fs.readFileSync(filePath, 'utf8');
    ejs.compile(str);
    console.log(`✅ OK : ${filePath}`);
  } catch (e) {
    console.error(`❌ ERREUR : ${filePath}\n${e.message}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.ejs')) {
      checkEJS(fullPath);
    }
  });
}

walk('./src/views');
