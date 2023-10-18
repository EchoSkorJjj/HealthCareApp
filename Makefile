up:
	docker-compose -f ./deploy/local/docker-compose.yml up

build:
	docker-compose -f ./deploy/local/docker-compose.yml build

# Command to start the development environment
dev:
	docker-compose -f docker-compose.yml up --build -d

# Command to stop the development environment
stop-dev:
	docker-compose -f docker-compose.yml down
