# Use the node:slim image as a base image
FROM node:slim

# Declaring env
ENV NODE_ENV development

# Set the working directory in the container (change to /react-docker if desired)
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Start your Vite React application
CMD ["npm", "run", "dev"]

# Expose port 5173 to access your client
EXPOSE 5173