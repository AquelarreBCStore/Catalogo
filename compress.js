const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Carpeta origen de tus imágenes
const inputFolder = './imagenes'; 
// Carpeta donde se guardarán las imágenes comprimidas en formato .webp
const outputFolder = './imagenes/optimizadas';

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(inputFolder, file);
    const outputFileName = `${path.parse(file).name}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    sharp(inputPath)
      .resize({ width: 1200, fit: 'inside', withoutEnlargement: true }) // Ancho máximo ideal para web
      .webp({ quality: 80 }) // Compresión WebP (reduce hasta un 80% el peso)
      .toFile(outputPath)
      .then(() => console.log(`✓ Optimizada con éxito: ${file} ➔ ${outputFileName}`))
      .catch(err => console.error(`Error procesando ${file}:`, err));
  }
});
