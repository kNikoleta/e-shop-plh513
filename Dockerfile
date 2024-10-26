# Stage 1: Build the Angular application
FROM node:18-alpine AS build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
# Stage 2: Serve the application using NGINX
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/e-shop-plh513/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

