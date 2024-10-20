# Stage 1: Build the Angular application
FROM node:18-alpine AS node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# Stage 2: Serve the application using NGINX
FROM nginx:alpine
COPY --from=node /app/dist/e-shop-plh513 /usr/share/nginx/html
EXPOSE 80