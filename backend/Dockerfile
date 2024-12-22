# Use official Node.js image as base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files
COPY . .

# Expose the port your app will run on (e.g., 4000)
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
