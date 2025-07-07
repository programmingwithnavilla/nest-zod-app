# Use official Node.js image
From node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build   

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]