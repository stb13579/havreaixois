# Image Optimization Scripts

## Overview

These scripts optimize images for web deployment, significantly reducing file sizes while maintaining visual quality.

## 📊 Expected Results

- **Property photos**: Resized to max 1920x1280, 80% quality
- **Aix city photos**: Resized to max 1600x1200, 75% quality  
- **Expected savings**: 70-85% file size reduction
- **Build size**: From ~42MB to ~5-8MB

## 🚀 Quick Start

### Optimize All Images

```bash
npm run optimize:images
```

This will:
1. Automatically backup your original images to `public/photos-backup`
2. Resize and compress all images
3. Show detailed progress and savings report

### Restore Original Images

If you need to go back to the originals:

```bash
npm run images:restore
```

## 📁 What Gets Optimized

- All `.jpg`, `.jpeg`, `.png` files in `/public/photos`
- All images in subdirectories (including `/public/photos/Aix-images`)

## 🎯 Optimization Settings

### Property Photos
```javascript
{
  maxWidth: 1920,
  maxHeight: 1280,
  quality: 80,      // JPEG quality
}
```

### Aix City Photos
```javascript
{
  maxWidth: 1600,
  maxHeight: 1200,
  quality: 75,      // JPEG quality
}
```

## ⚠️ Important Notes

1. **First run creates backup**: The script automatically backs up originals on first run
2. **Subsequent runs**: Won't create new backups if `photos-backup` already exists
3. **No WebP yet**: Currently optimizes JPEG only (WebP support coming soon)
4. **Progressive JPEGs**: Creates progressive JPEGs for better perceived loading

## 🔧 Manual Backup

If you want to manually backup before running:

```bash
npm run images:backup
```

## 📈 Monitoring Results

The script outputs:
- Individual file savings (KB and %)
- Total size before/after
- Overall savings percentage

Example output:
```
✓ master-bedroom1.jpeg
  169KB → 45KB (73.4% smaller)

Total original size: 42.8 MB
Total optimized size: 6.2 MB
Total savings: 36.6 MB (85.5%)
```

## 🐛 Troubleshooting

### Error: "sharp not found"
```bash
npm install --save-dev sharp
```

### Error: "Permission denied"
```bash
chmod +x scripts/optimize-images.js
```

### Want to re-optimize after restoring?
```bash
npm run images:restore
npm run optimize:images
```

## 🚢 Deployment Impact

**Before optimization:**
- Build size: ~43MB
- Deploy time: ~2-3 minutes
- First visitor load: ~1-2MB

**After optimization:**
- Build size: ~10MB (75% reduction)
- Deploy time: ~1.5 minutes (faster)
- First visitor load: ~300-500KB (80% reduction)

## 🔮 Future Enhancements

- [ ] WebP conversion with JPEG fallbacks
- [ ] Automatic optimization on pre-commit hook
- [ ] Multiple size variants for responsive images
- [ ] AVIF format support
- [ ] Automatic CDN upload

## 📚 Technical Details

**Tool**: [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing
**Format**: JPEG with progressive scan
**Algorithm**: MozJPEG for better compression
**Resize**: Maintains aspect ratio, never enlarges
