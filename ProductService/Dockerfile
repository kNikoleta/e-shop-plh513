FROM node:18

# Set the working directory
WORKDIR /app/ProductService

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "app.js"]
