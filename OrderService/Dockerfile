FROM node:18
#path to the container's file system
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3004
CMD ["npm", "start"] 
