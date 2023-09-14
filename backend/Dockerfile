# Fetching the minified node image on apline linux
FROM node:slim

# Setting up the work directory
WORKDIR /express-docker

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# # Install project dependencies (production only)
# RUN npm install --production
# # Set NODE_ENV to "production" for the backend
# ENV NODE_ENV production

# # Set NODE_ENV to "development" for the backend
# ENV NODE_ENV development

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "npm", "start" ]

# Exposing server port
EXPOSE 3500