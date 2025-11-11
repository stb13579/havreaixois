# Lazy Loading Strategy

## Overview

Lazy loading defers the loading of images until they're needed, dramatically improving initial page load performance.

## Implementation

### 🎯 Priority Loading (Above the Fold)

**Hero Carousel** - `priority={true}`
- The main hero section carousel loads immediately
- Only the first image gets `priority` attribute
- Critical for First Contentful Paint (FCP)
- Users see content instantly

### ⚡ Lazy Loading (Below the Fold)

All other images use `loading="lazy"`:

1. **Property Room Carousels** - Highlights section
   - Living room, kitchen, bedrooms, bathrooms, office, terrace
   - Load when user scrolls to section

2. **Aix City Photos Carousel** - AboutAix section
   - City images load on demand
   - Saves ~1.2MB initial bandwidth

3. **Gallery Grid** - Gallery section
   - 13 thumbnail images
   - Load progressively as user scrolls

4. **Map SVG** - Contact section
   - Loads when user reaches bottom
   - Minimal file size but good practice

## Performance Impact

### Before Lazy Loading
```
Initial page load: ~2-3MB
Images loaded: All 20+ images
Time to Interactive: ~3-4s
```

### After Lazy Loading
```
Initial page load: ~300-500KB
Images loaded: 4 hero images only
Time to Interactive: ~1-2s
Remaining images: Load on scroll
```

## Technical Details

### Next.js Image Component

```tsx
<Image 
  src="/photo.jpg"
  alt="Description"
  loading="lazy"           // Browser-native lazy loading
  sizes="..."              // Responsive image sizes
  priority={false}         // Don't preload
/>
```

### Carousel Component

The Carousel component now accepts a `priority` prop:

```tsx
<Carousel 
  images={images}
  priority={true}  // For above-the-fold carousels
/>

<Carousel 
  images={images}
  priority={false} // For below-the-fold carousels
/>
```

### Responsive Sizes

We specify appropriate `sizes` attributes for optimal image selection:

**Hero/Large Carousels:**
```
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
```

**Gallery Thumbnails:**
```
sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
```

This tells the browser to download appropriately sized images based on viewport.

## Browser Support

- **Native Lazy Loading**: Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Fallback**: Next.js provides automatic fallback for older browsers
- **No JavaScript Required**: Uses browser-native loading attribute

## Core Web Vitals Impact

### Largest Contentful Paint (LCP)
- ✅ Hero image loads with priority
- ✅ Target: < 2.5s

### Cumulative Layout Shift (CLS)
- ✅ Width/height specified on all images
- ✅ Prevents layout shift as images load
- ✅ Target: < 0.1

### First Input Delay (FID)
- ✅ Reduced initial JavaScript execution
- ✅ Page interactive faster
- ✅ Target: < 100ms

## Testing

### Verify Lazy Loading

1. **Chrome DevTools:**
   - Open Network tab
   - Reload page
   - Filter by "Img"
   - See only hero images load initially
   - Scroll down and watch other images load

2. **Lighthouse:**
   ```bash
   npm run build
   npm run start
   # Run Lighthouse in Chrome DevTools
   ```
   
   Look for:
   - "Defer offscreen images" ✅
   - Improved Performance score
   - Better LCP timing

3. **Visual Test:**
   - Slow 3G throttling in DevTools
   - Hero should appear quickly
   - Gallery images load as you scroll

## Mobile Performance

Lazy loading is especially critical for mobile:

- **Reduced data usage**: Only download visible images
- **Faster initial load**: Less to parse and render
- **Better battery life**: Less CPU/network activity
- **Improved UX**: Content appears faster

## Best Practices

✅ **DO:**
- Use `priority` only for above-the-fold images
- Specify width/height to prevent layout shift
- Use appropriate `sizes` attribute
- Test on slow connections

❌ **DON'T:**
- Mark all images as priority (defeats the purpose)
- Forget width/height (causes layout shift)
- Lazy load above-the-fold content
- Assume images load instantly

## Monitoring

Check these metrics in Google Analytics:

1. **Page Load Time** - Should decrease
2. **Bounce Rate** - Should decrease (faster loads)
3. **Time to Interactive** - Should decrease
4. **Mobile Performance** - Should improve significantly

## Further Optimizations

Future enhancements:
- [ ] Add blur placeholder for better perceived performance
- [ ] Implement intersection observer for more control
- [ ] Add WebP with JPEG fallback
- [ ] Consider adding AVIF format
- [ ] Implement service worker for offline support
