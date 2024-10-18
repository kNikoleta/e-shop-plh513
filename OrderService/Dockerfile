# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app/OrderService

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port that your app runs on
EXPOSE 3004

# Command to run the application
CMD ["node", "server.js"]
