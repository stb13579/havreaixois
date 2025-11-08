#!/bin/bash

# OpenGraph Image Creation Guide for Le Havre Aixois
# ===================================================
# An OpenGraph image is what appears when someone shares your site on social media
# Recommended size: 1200x630 pixels (JPG format)

echo "📸 OpenGraph Image Creation Options:"
echo ""
echo "OPTION 1 - Quick & Free (Canva.com):"
echo "1. Go to canva.com and create account (free)"
echo "2. Search for 'Facebook Post' or create custom 1200x630px design"
echo "3. Upload your best photo (recommend: terrace1.jpeg or master-bedroom1.jpeg)"
echo "4. Add text overlay:"
echo "   - Title: 'Le Havre Aixois' (large, bold)"
echo "   - Subtitle: 'Aix-en-Provence, France'"
echo "5. Download as JPG and save as public/og.jpg"
echo ""
echo "OPTION 2 - Use existing photo directly:"
echo "1. Choose your best photo showing the apartment's character"
echo "2. Resize to 1200x630px (crop to landscape)"
echo "3. Optionally add text overlay using Preview (Mac) or GIMP (free)"
echo "4. Save as public/og.jpg"
echo ""
echo "OPTION 3 - ImageMagick (if installed):"
echo "Convert an existing photo automatically:"
echo ""
echo "  convert public/photos/terrace1.jpeg \\"
echo "    -resize 1200x630^ -gravity center -extent 1200x630 \\"
echo "    -font Helvetica-Bold -pointsize 72 -fill white \\"
echo "    -gravity north -annotate +0+100 'Le Havre Aixois' \\"
echo "    -pointsize 36 -annotate +0+200 'Aix-en-Provence' \\"
echo "    public/og.jpg"
echo ""
echo "Current photos available in public/photos/:"
ls -1 public/photos/*.jpeg 2>/dev/null | head -5
echo ""
echo "💡 Tip: Use a bright, inviting photo that shows the terrace or living room"
echo "    with good natural light. This is what potential guests will see first!"
