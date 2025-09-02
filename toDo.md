# Production Deployment To-Do

## Infrastructure
- [ ] Purchase domain and configure DNS records.
- [ ] Acquire TLS certificates and enable HTTPS in the Nginx configuration.
- [ ] Choose hosting solution (e.g., container platform or static host) and set up automated deployment.
- [ ] Push built image to a container registry via CI/CD.

## Application
- [ ] Define required environment variables (e.g., `NEXT_PUBLIC_CONTACT_EMAIL`) in `.env.production` and secrets manager.
- [x] Establish CI pipeline to run `npm run lint` and `npm run build` on every commit.
- [ ] Add monitoring and wire the `/api/health` endpoint to load balancer health checks.
- [ ] Review Nginx caching/compression settings and add gzip/brotli as needed.
- [ ] Add analytics, logging, `robots.txt`, and `sitemap.xml`.

## Content and Polish
- [ ] Fix CSS issue at the bottom of the page.
- [ ] Finalize all links and proofread the French version.
- [ ] Improve apartment photo selection.
- [ ] Create booking.com and VRBO listings.
