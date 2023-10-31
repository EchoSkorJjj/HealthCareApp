# # Use the node:slim image as a base image
# FROM node:slim

# # Declaring env
# ENV NODE_ENV development

# # Set the working directory in the container (change to /react-docker if desired)
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# # ENV PATH /app/node_modules/.bin:$PATH

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy the rest of your application code to the container
# COPY . .

# RUN npm run build

# # Start your Vite React application
# CMD ["npm", "run", "dev"]

# # Expose port 5173 to access your client
# EXPOSE 5173

# Stage 1: Build the React application
FROM node:slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app using a simple Node.js server
FROM node:slim

WORKDIR /app

# Install 'serve' to run a static server
RUN npm install -g serve

# Copy the built files from the build stage
COPY --from=build /app/dist /app

# Expose the port the app runs on
EXPOSE $PORT

# Serve the static files
CMD ["serve", "-s", ".", "-l", "tcp://0.0.0.0:$PORT"]

