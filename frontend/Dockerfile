# Use the node:slim image as a base image
FROM node:slim

# Set the working directory in the container (change to /react-docker if desired)
WORKDIR /react-docker

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose port 3000 to access your frontend
EXPOSE 3000

# Start your Vite React application
CMD ["npm", "run", "dev"]
