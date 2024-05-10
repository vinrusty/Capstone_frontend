# Use official Node.js image as base
FROM node:latest 

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using yarn) to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from current directory to container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 to outside world
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
