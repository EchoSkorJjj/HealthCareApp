# Define environment variables from .env file
include .env

# Docker image name
IMAGE_NAME = wad2-backend:1.0-dev

# Build the Docker image
build:
    docker build . -t $(IMAGE_NAME) -f Dockerfile

# Start the backend service
up:
    docker-compose up -d backend

# Stop and remove the backend service
down:
    docker-compose down

# Show backend logs
logs:
    docker-compose logs backend

# Run backend tests
test:
    docker-compose -f docker-compose.test.yml up --abort-on-container-exit

# Clean up Docker resources (containers and images)
clean:
    docker-compose down -v
    docker rmi $(IMAGE_NAME)

# View the MongoDB logs
mongo-logs:
    docker-compose logs mongo

# Tail the MongoDB logs (useful for live monitoring)
mongo-tail:
    docker-compose logs -f mongo
