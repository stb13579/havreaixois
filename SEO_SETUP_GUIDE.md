# SEO & Analytics Setup Guide for Le Havre Aixois

## ✅ Completed Tasks (November 8, 2025)

### 1. OpenGraph Social Media Image
- **Status**: ✅ Created
- **Location**: `public/og.jpg`
- **What**: 1200x630px image for social media sharing (Facebook, Twitter, LinkedIn)
- **Recommendation**: Consider creating a custom version with text overlay using Canva.com

### 2. Sitemap Configuration
- **Status**: ✅ Fixed
- **Location**: `public/sitemap.xml`
- **Updated**: Domain changed from `example.com` to `lehavreaixois.com`
- **Added**: Image sitemap entries for better image SEO

### 3. Robots.txt Configuration
- **Status**: ✅ Fixed
- **Location**: `public/robots.txt`
- **Updated**: Sitemap URL now points to `lehavreaixois.com`

### 4. Google Analytics 4 Integration
- **Status**: ✅ Implemented
- **Files Modified**: `app/layout.tsx`, `components/Landing.tsx`
- **New File**: `lib/analytics.ts` (tracking utilities)
- **Features Added**:
  - Page view tracking
  - Booking button click tracking (Airbnb, VRBO, Direct)
  - Inquiry form submission tracking
  - Language toggle tracking
  - Custom event tracking framework

### 5. Domain Updates
- **Status**: ✅ Complete
- **Changed**: All URLs updated from `havreaixois.com` to `lehavreaixois.com`
- **Files**: `app/layout.tsx`, `app/page.tsx`, `public/sitemap.xml`, `public/robots.txt`

### 6. Enhanced SEO Metadata
- **Status**: ✅ Complete
- **Improvements**:
  - Added location-specific keywords
  - Enhanced meta descriptions with action words ("Book", "Explore")
  - Added structured data (JSON-LD) for lodging business
  - Added amenity features for search engines
  - Added geo-coordinates for local SEO
  - Added canonical URL

---

## 🎯 Next Steps: You Need To Do

### Step 1: Set Up Google Analytics 4 (Required)
1. Go to https://analytics.google.com
2. Create a new GA4 property for "Le Havre Aixois"
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to your project:
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env.local
   ```
5. For production deployment, add this environment variable to your hosting platform

### Step 2: Set Up Google Search Console (Critical for SEO)
1. Go to https://search.google.com/search-console
2. Add property: `lehavreaixois.com`
3. Verify ownership (DNS or HTML file method)
4. Submit your sitemap: `https://lehavreaixois.com/sitemap.xml`
5. Monitor for indexing issues and search performance

### Step 3: Domain Configuration
Ensure your domain DNS is properly configured:
- **A Record**: Point to your hosting provider's IP
- **WWW CNAME**: Point `www.lehavreaixois.com` to `lehavreaixois.com`
- **SSL Certificate**: Enable HTTPS (usually automatic with modern hosts)

### Step 4: Deploy Your Updates
```bash
# Build the production site
npm run build

# Test locally
npm run start

# Or build static export
npm run build:static

# Deploy to your hosting platform
```

---

## 📊 Tracking Your Success

### Key Metrics to Monitor (Google Analytics 4)

**Traffic Sources:**
- Organic Search (Google)
- Direct Traffic
- Referral Traffic (Airbnb, VRBO links)
- Social Media

**Key Events:**
- `click_booking_link` - Track which platform users prefer
- `submit_inquiry` - Direct booking inquiries (highest value!)
- `view_gallery` - User engagement with photos
- `change_language` - International audience insights

**Goals to Set:**
- Booking button clicks (conversions)
- Form submissions (leads)
- Time on page > 2 minutes (engagement)
- Scroll depth > 75% (engagement)

---

## 🚀 Quick Marketing Wins (Do This Week!)

### 1. Content Marketing
**Create these blog posts/pages:**
- "10 Things to Do in Aix-en-Provence in 2025"
- "Best Time to Visit Provence's Lavender Fields"
- "Where to Eat in Aix: Local's Guide"
- "Day Trips from Aix-en-Provence"

**Why**: Ranks for long-tail keywords, brings organic traffic

### 2. Social Media Setup
**Create Instagram account** (@lehavreaixois):
- Post your best 9 photos
- Use hashtags: #AixEnProvence #Provence #FranceTravel #VacationRental
- Tag location: Aix-en-Provence
- Link to website in bio

**Create Pinterest account**:
- Create board: "Provence Travel Guide"
- Pin your property photos (link to website)
- Repin popular Provence content
- Pinterest drives massive travel site traffic!

### 3. Local Listings
**Submit to these directories** (FREE):
- Google Business Profile (if eligible)
- TripAdvisor Vacation Rentals
- Booking.com (paid commission but high visibility)
- FlipKey by TripAdvisor
- Holiday Lettings

### 4. Get Backlinks
**Reach out to:**
- Provence travel bloggers (offer free stay for review)
- "Best Airbnbs in France" list curators
- Local tourism boards
- Wedding planning sites (destination weddings!)

---

## 💰 Paid Advertising Strategy (3-Month Budget: $1500-2000)

### Google Ads Campaign
**Budget**: $500-700/month

**Target Keywords:**
- "Aix-en-Provence vacation rental"
- "Aix apartment rental"
- "Provence accommodation"
- "apartment near Cours Mirabeau"
- "Aix-en-Provence short term rental"

**Geographic Targets:**
- United States (high-value tourists)
- United Kingdom
- Germany, Netherlands (nearby markets)
- Australia (long-stay travelers)

**Landing Page**: Your homepage (already optimized!)

### Facebook/Instagram Ads
**Budget**: $300-500/month

**Audience:**
- Age: 30-60
- Interests: France travel, Provence, wine tourism, lavender fields
- Behaviors: International travelers, luxury travel
- Exclude: People who already visited your site

**Ad Creative:**
- Carousel of your best 5 photos
- Video tour (if available)
- Caption: "Your Provence hideaway awaits ✨"
- CTA: "Book Now" → Link to website

**Peak Seasons to Target:**
- **January-March**: Book for summer (July lavender season)
- **September-October**: Book for holiday season
- **Year-round**: Last-minute deals

---

## 📧 Email Marketing Setup

### Tools (Free Plans Available):
- Mailchimp (free up to 500 contacts)
- ConvertKit (free for creators)
- Brevo/Sendinblue (free tier)

### Email Sequences:
1. **Welcome Email** (immediate)
   - Thank you for inquiry
   - What makes your place special
   - Link to book

2. **Follow-up** (3 days later)
   - "Still interested in Aix-en-Provence?"
   - Share guest testimonial
   - Limited availability notice

3. **Seasonal Campaign** (monthly)
   - "Lavender Season is Coming!" (May)
   - "Christmas Markets in Provence" (November)
   - "Spring in Aix" (March)

---

## 🎨 Content Ideas (SEO + Social Media)

### Blog Post Ideas (High Search Volume):
1. "Aix-en-Provence Travel Guide 2025"
2. "When to Visit Provence's Lavender Fields"
3. "Best Markets in Aix-en-Provence"
4. "Cézanne Trail Walking Guide"
5. "Day Trips from Aix: Complete Guide"
6. "Where to Eat in Aix: 15 Best Restaurants"
7. "Provence Wine Tasting Guide"
8. "Best Time to Visit Aix-en-Provence"
9. "Aix-en-Provence vs Nice: Which to Visit?"
10. "Weekend Itinerary: 3 Days in Aix"

### Social Media Content Calendar:
**Monday**: Local market photo + caption about shopping tips
**Wednesday**: Guest testimonial or review screenshot
**Friday**: Weekend inspiration (day trip ideas, restaurant rec)
**Sunday**: Property photo with booking CTA

---

## 🔍 Technical SEO Checklist

### ✅ Already Done:
- [x] Meta titles with keywords
- [x] Meta descriptions
- [x] OpenGraph tags
- [x] Twitter cards
- [x] JSON-LD structured data
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Image optimization
- [x] Mobile responsive
- [x] Fast loading (Next.js)

### 🔲 Still To Do:
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add image alt text to all photos (SEO for image search)
- [ ] Create XML sitemap for blog posts (when you add blog)
- [ ] Set up 301 redirects (if you had old domain)
- [ ] Enable GZIP compression (usually automatic)
- [ ] Set up Google My Business (if eligible)
- [ ] Add FAQ schema markup
- [ ] Add Review schema markup (after you get reviews)

---

## 📈 Expected Results Timeline

### Month 1 (Immediate):
- Google indexing begins
- Paid ads drive first traffic
- Social media following starts
- First direct inquiries from website

### Month 2-3:
- Organic search traffic increases
- Start ranking for long-tail keywords
- Backlinks from blog outreach
- Email list grows to 50-100 contacts

### Month 3-4:
- Ranking on page 1-2 for some keywords
- Steady direct booking inquiries
- Reduced dependency on Airbnb/VRBO
- 500-1000 monthly website visitors

---

## 🆘 Support Resources

**Web Analytics:**
- Google Analytics 4 Documentation: https://support.google.com/analytics
- Google Search Console: https://search.google.com/search-console

**SEO Tools (Free):**
- Google Keyword Planner (requires Google Ads account)
- Ubersuggest (neil patel.com) - Free keyword research
- AnswerThePublic.com - Content ideas
- Google Trends - Seasonal planning

**Learning Resources:**
- Moz Beginner's Guide to SEO: moz.com/beginners-guide-to-seo
- Google SEO Starter Guide (free PDF)
- Airbnb hosting tips: airbnb.com/resources

---

## 📞 Questions?

If you need help with any of these steps, just ask! Priority items:
1. Get GA4 set up (needs measurement ID)
2. Submit to Google Search Console
3. Start creating content (blog posts)
4. Set up paid ads campaign

Good luck with your rental! 🎉
