up:
	docker-compose -f docker-compose.dev.yml up

build:
	docker-compose -f docker-compose.dev.yml build

# Command to start the development environment
dev:
	docker-compose -f docker-compose.dev.yml up --build -d

# Command to stop the development environment
stop-dev:
	docker-compose -f docker-compose.dev.yml down
