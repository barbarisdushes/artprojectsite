const fs = require('fs');
const path = require('path');

// Путь к сгенерированному HTML файлу
const htmlFilePath = path.join(__dirname, 'out', 'index.html');

// Читаем файл
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Заменяем пути к ресурсам _next на относительные
htmlContent = htmlContent.replace(/\/_next\//g, '_next/');

// Заменяем абсолютные пути к изображениям на относительные
htmlContent = htmlContent.replace(/href="\/favicon.ico"/g, 'href="favicon.ico"');

// Сохраняем измененный файл
fs.writeFileSync(htmlFilePath, htmlContent);

console.log('Пути успешно исправлены в index.html'); 