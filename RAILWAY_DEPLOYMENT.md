# 🚂 Railway Deployment Guide

## Quick Setup

### 1. Port Configuration
**Use Port: `80`** (not 8080)

Your Dockerfile uses Nginx which listens on port 80.

---

### 2. Environment Variables

In Railway Dashboard, add these variables:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-19B9539M6Q
NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/AKfycbwDtXUFL_9alzUZx6SLB8QmJOpFB9NBk9tdyDYUxo-82JqLKIxltYqlw6o6nX1dTcOp0g/exec
```

---

### 3. Deploy from GitHub

1. **Connect Your Repo:**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `stb13579/havreaixois`

2. **Configure Build:**
   - Railway will auto-detect your Dockerfile
   - Build command: (automatic from Dockerfile)
   - Port: `80`

3. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add the two variables above

4. **Set Custom Domain:**
   - Go to "Settings" tab
   - Click "Generate Domain" (get a Railway URL first)
   - Then add custom domain: `lehavreaixois.com`
   - Railway will provide DNS instructions

---

### 4. DNS Configuration

After adding your domain in Railway, update your DNS:

**Option A: Use Railway Nameservers (Easiest)**
Railway will give you nameservers like:
```
ns1.railway.app
ns2.railway.app
```

**Option B: CNAME Record (Most Common)**
Add a CNAME record at your domain registrar:
```
CNAME  @  your-app.railway.app
CNAME  www  your-app.railway.app
```

Railway will automatically handle SSL certificates.

---

## 🔍 Troubleshooting

### "Application failed to respond"
- Check port is set to `80` (not 8080)
- Verify environment variables are set
- Check build logs for errors

### "Build failed"
- Ensure environment variables are added BEFORE building
- Check if Docker build succeeds locally:
  ```bash
  docker build \
    --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID=G-19B9539M6Q \
    --build-arg NEXT_PUBLIC_CONTACT_ENDPOINT=your-endpoint \
    -t havreaixois .
  ```

### "Domain not working"
- Wait 24-48 hours for DNS propagation
- Verify DNS settings with: `dig lehavreaixois.com`
- Check Railway domain is "Active" in dashboard

---

## ✅ Deployment Checklist

- [ ] Connect GitHub repo to Railway
- [ ] Add environment variables in Railway dashboard
- [ ] Set port to `80`
- [ ] Deploy and verify site loads on Railway URL
- [ ] Add custom domain `lehavreaixois.com`
- [ ] Configure DNS at your registrar
- [ ] Wait for SSL certificate (automatic, ~5-10 minutes)
- [ ] Test: https://lehavreaixois.com
- [ ] Verify Google Analytics is tracking (check GA dashboard)

---

## 💰 Railway Pricing

**Hobby Plan:** $5/month
- Includes 500 hours execution time
- Plenty for a static site with Nginx
- Auto-SSL, custom domains included

---

## 📊 Monitor Your Deployment

**Railway Dashboard:**
- View build logs
- Monitor resource usage
- Check deployment status
- View application logs

**Google Analytics:**
- Visitor tracking starts immediately
- Real-time reports: https://analytics.google.com

---

## 🔄 Future Deployments

Once set up, Railway auto-deploys on every push to `main`:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build new Docker image
3. Deploy with zero downtime
4. Your site updates in ~2-3 minutes

---

## 🆘 Support

**Railway Documentation:**
https://docs.railway.app

**Common Commands:**
```bash
# Install Railway CLI (optional)
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Open dashboard
railway open
```

---

**Your site should now be live at:** https://lehavreaixois.com 🎉
