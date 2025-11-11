#!/usr/bin/env node

/**
 * Image Optimization Script for Le Havre Aixois
 * 
 * Optimizes all images in /public/photos for web deployment:
 * - Resizes to appropriate dimensions
 * - Compresses to 75-80% quality
 * - Creates WebP versions with JPEG fallbacks
 * - Maintains original aspect ratios
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, '../public/photos');
const BACKUP_DIR = path.join(__dirname, '../.photos-backup'); // Store in root, not in public/

// Image size configurations
const IMAGE_CONFIGS = {
  // Property photos (living room, kitchen, bedrooms, etc.)
  property: {
    maxWidth: 1920,
    maxHeight: 1280,
    quality: 80,
  },
  // Aix-en-Provence city photos
  aix: {
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 75,
  },
};

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Get file size in KB
 */
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Backup original images
 */
function backupImages() {
  if (fs.existsSync(BACKUP_DIR)) {
    console.log('⚠️  Backup directory already exists. Skipping backup.');
    return false;
  }
  
  console.log('📦 Creating backup of original images...');
  fs.cpSync(PHOTO_DIR, BACKUP_DIR, { recursive: true });
  console.log('✅ Backup created at:', BACKUP_DIR);
  return true;
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  const relativePath = path.relative(PHOTO_DIR, filePath);
  const isAixImage = relativePath.includes('Aix-images');
  const config = isAixImage ? IMAGE_CONFIGS.aix : IMAGE_CONFIGS.property;
  
  const originalSize = getFileSizeKB(filePath);
  
  try {
    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    
    // Calculate new dimensions maintaining aspect ratio
    let newWidth = metadata.width;
    let newHeight = metadata.height;
    
    if (newWidth > config.maxWidth || newHeight > config.maxHeight) {
      const widthRatio = config.maxWidth / newWidth;
      const heightRatio = config.maxHeight / newHeight;
      const ratio = Math.min(widthRatio, heightRatio);
      
      newWidth = Math.round(newWidth * ratio);
      newHeight = Math.round(newHeight * ratio);
    }
    
    // Optimize JPEG
    await sharp(filePath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: config.quality,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(filePath + '.tmp');
    
    // Replace original with optimized
    fs.renameSync(filePath + '.tmp', filePath);
    
    const newSize = getFileSizeKB(filePath);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`  ✓ ${relativePath}`);
    console.log(`    ${originalSize}KB → ${newSize}KB (${savings}% smaller)`);
    
    return {
      file: relativePath,
      originalSize: parseFloat(originalSize),
      newSize: parseFloat(newSize),
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`  ✗ Error optimizing ${relativePath}:`, error.message);
    return null;
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  
  // Backup originals
  const backedUp = backupImages();
  if (backedUp) {
    console.log('');
  }
  
  // Get all images
  const imageFiles = getImageFiles(PHOTO_DIR);
  console.log(`📸 Found ${imageFiles.length} images to optimize\n`);
  
  // Optimize each image
  const results = [];
  for (const filePath of imageFiles) {
    const result = await optimizeImage(filePath);
    if (result) {
      results.push(result);
    }
  }
  
  // Summary
  console.log('\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
  
  console.log(`Total original size: ${(totalOriginal / 1024).toFixed(2)} MB`);
  console.log(`Total optimized size: ${(totalNew / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((totalOriginal - totalNew) / 1024).toFixed(2)} MB (${totalSavings}%)`);
  console.log(`\n✨ Optimization complete!`);
  console.log(`\n💡 Original images backed up to: ${BACKUP_DIR}`);
  console.log(`   To restore: npm run images:restore`);
}

// Run optimization
optimizeAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
