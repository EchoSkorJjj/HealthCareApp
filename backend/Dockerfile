# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV development
# Setting up the work directory
WORKDIR /express-docker

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "npm", "start" ]

# Exposing server port
EXPOSE 3500