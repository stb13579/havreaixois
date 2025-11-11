#!/usr/bin/env node

/**
 * WebP/AVIF Comparison Test
 * 
 * Tests a sample of images to see potential savings from WebP and AVIF formats
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, '../public/photos');
const TEST_OUTPUT = path.join(__dirname, '../.format-test');

async function testFormats() {
  console.log('🧪 Testing WebP and AVIF Format Conversion\n');
  console.log('==========================================\n');
  
  // Get sample images
  const images = [
    'master-bedroom1.jpeg',
    'livingroom1.jpeg',
    'kitchen1.jpeg',
    'Aix-images/France-002438_-_Cours_Mirabeau_Fountain_(15867627856).jpg',
    'Aix-images/Aix-en-Provence_Cours_Mirabeau.jpg',
  ];
  
  // Create test output directory
  if (!fs.existsSync(TEST_OUTPUT)) {
    fs.mkdirSync(TEST_OUTPUT, { recursive: true });
  }
  
  const results = [];
  
  for (const img of images) {
    const filePath = path.join(PHOTO_DIR, img);
    if (!fs.existsSync(filePath)) continue;
    
    const fileName = path.basename(img);
    const jpegSize = fs.statSync(filePath).size;
    
    try {
      // Convert to WebP
      const webpPath = path.join(TEST_OUTPUT, fileName.replace(/\.(jpg|jpeg)$/i, '.webp'));
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;
      
      // Convert to AVIF
      const avifPath = path.join(TEST_OUTPUT, fileName.replace(/\.(jpg|jpeg)$/i, '.avif'));
      await sharp(filePath)
        .avif({ quality: 80 })
        .toFile(avifPath);
      const avifSize = fs.statSync(avifPath).size;
      
      const webpSavings = ((1 - webpSize / jpegSize) * 100).toFixed(1);
      const avifSavings = ((1 - avifSize / jpegSize) * 100).toFixed(1);
      
      results.push({
        file: fileName,
        jpeg: jpegSize,
        webp: webpSize,
        avif: avifSize,
        webpSavings: parseFloat(webpSavings),
        avifSavings: parseFloat(avifSavings),
      });
      
      console.log(`📸 ${fileName}`);
      console.log(`   JPEG: ${(jpegSize / 1024).toFixed(1)} KB`);
      console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB (${webpSavings}% smaller)`);
      console.log(`   AVIF: ${(avifSize / 1024).toFixed(1)} KB (${avifSavings}% smaller)`);
      console.log('');
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}\n`);
    }
  }
  
  // Summary
  console.log('==========================================');
  console.log('📊 Summary\n');
  
  const totalJpeg = results.reduce((sum, r) => sum + r.jpeg, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webp, 0);
  const totalAvif = results.reduce((sum, r) => sum + r.avif, 0);
  
  const avgWebpSavings = results.reduce((sum, r) => sum + r.webpSavings, 0) / results.length;
  const avgAvifSavings = results.reduce((sum, r) => sum + r.avifSavings, 0) / results.length;
  
  console.log(`Sample size: ${results.length} images`);
  console.log('');
  console.log(`Total JPEG: ${(totalJpeg / 1024).toFixed(1)} KB`);
  console.log(`Total WebP: ${(totalWebp / 1024).toFixed(1)} KB (${((1 - totalWebp / totalJpeg) * 100).toFixed(1)}% smaller)`);
  console.log(`Total AVIF: ${(totalAvif / 1024).toFixed(1)} KB (${((1 - totalAvif / totalJpeg) * 100).toFixed(1)}% smaller)`);
  console.log('');
  console.log(`Average WebP savings: ${avgWebpSavings.toFixed(1)}%`);
  console.log(`Average AVIF savings: ${avgAvifSavings.toFixed(1)}%`);
  console.log('');
  
  // Projections
  const currentTotalSize = 2.7 * 1024 * 1024; // 2.7 MB in bytes
  const projectedWebp = currentTotalSize * (1 - avgWebpSavings / 100);
  const projectedAvif = currentTotalSize * (1 - avgAvifSavings / 100);
  
  console.log('==========================================');
  console.log('🔮 Projected Full Conversion\n');
  console.log(`Current (optimized JPEG): 2.7 MB`);
  console.log(`With WebP: ${(projectedWebp / 1024 / 1024).toFixed(2)} MB (${avgWebpSavings.toFixed(1)}% smaller)`);
  console.log(`With AVIF: ${(projectedAvif / 1024 / 1024).toFixed(2)} MB (${avgAvifSavings.toFixed(1)}% smaller)`);
  console.log('');
  console.log(`Savings from WebP: ${((currentTotalSize - projectedWebp) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Savings from AVIF: ${((currentTotalSize - projectedAvif) / 1024 / 1024).toFixed(2)} MB`);
  console.log('');
  
  // Browser support
  console.log('==========================================');
  console.log('🌐 Browser Support (Nov 2025)\n');
  console.log('WebP:');
  console.log('  ✅ Chrome, Edge, Firefox, Safari 14+, Opera');
  console.log('  ✅ ~97% global browser support');
  console.log('  ✅ Very mature and stable');
  console.log('');
  console.log('AVIF:');
  console.log('  ✅ Chrome 85+, Firefox 93+, Safari 16+, Edge 121+');
  console.log('  ⚠️  ~85-90% global browser support');
  console.log('  ⚠️  Slower encoding (but better compression)');
  console.log('');
  
  // Recommendation
  console.log('==========================================');
  console.log('💡 Recommendation\n');
  
  if (avgWebpSavings < 15 && avgAvifSavings < 20) {
    console.log('❌ NOT WORTH IT for your use case');
    console.log('');
    console.log('Reasons:');
    console.log('• Your JPEGs are already highly optimized (93.5% reduction)');
    console.log(`• WebP would only save ~${avgWebpSavings.toFixed(1)}% more`);
    console.log(`• Additional complexity of maintaining multiple formats`);
    console.log('• Minimal real-world impact (<1MB total savings)');
    console.log('• Already at 2.7MB - excellent for a vacation rental site');
  } else if (avgWebpSavings >= 15 && avgWebpSavings < 25) {
    console.log('⚠️  MARGINAL BENEFIT');
    console.log('');
    console.log('Consider if:');
    console.log('• You need every KB of optimization');
    console.log('• You have very high mobile traffic');
    console.log('• You want to future-proof');
    console.log('');
    console.log('Skip if:');
    console.log('• Current performance is already good');
    console.log('• Want to keep deployment simple');
  } else {
    console.log('✅ RECOMMENDED');
    console.log('');
    console.log('Benefits:');
    console.log(`• WebP saves ${avgWebpSavings.toFixed(1)}% average`);
    console.log(`• AVIF saves ${avgAvifSavings.toFixed(1)}% average`);
    console.log('• Noticeable improvement for users');
    console.log('• Worth the implementation effort');
  }
  console.log('');
  
  // Cleanup
  fs.rmSync(TEST_OUTPUT, { recursive: true });
  console.log('✨ Test complete (temporary files cleaned up)\n');
}

testFormats().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
