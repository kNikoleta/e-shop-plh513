# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory
WORKDIR /e-shop-plh513

# Copy the rest of your application code
COPY . .

# Install dependencies
RUN npm install -g @angular /cli

RUN yarn install

# Build the Angular application
RUN npm run build --prod


# Command to run Nginx
CMD ["ng", "serve", "--host", "0.0.0.0"]
