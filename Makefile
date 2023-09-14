# Command to start the development environment
dev:
	docker-compose -f docker-compose.dev.yml up --build -d

# Command to start the production environment
prod:
	docker-compose -f docker-compose.prod.yml up --build -d

# Command to stop and remove all containers
stop:
	docker-compose down --remove-orphans
