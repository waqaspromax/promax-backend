# Use Node.js base image
FROM node:18-slim

# Install Python 3 (required by yt-dlp)
RUN apt-get update && apt-get install -y python3 python3-pip curl && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose port 8000
EXPOSE 8000

# Start server
CMD ["node", "server.js"]
