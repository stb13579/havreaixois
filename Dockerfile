# ---- build static site ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# produces static site into /app/out
RUN npm run build:static

# ---- minimal Nginx to serve the static files ----
FROM nginx:alpine
# Optional: custom nginx config for caching + clean 404
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
