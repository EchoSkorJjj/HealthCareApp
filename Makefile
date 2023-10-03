up:
	docker-compose -f docker-compose.dev.yml up

prod-up:
	docker-compose -f docker-compose.prod.yml up

build:
	docker-compose -f docker-compose.dev.yml build

prod-build:
	docker-compose -f docker-compose.prod.yml build

# Command to start the development environment
dev:
	docker-compose -f docker-compose.dev.yml up --build -d

# Command to start the production environment
prod:
	docker-compose -f docker-compose.prod.yml up --build -d

# Command to stop the development environment
stop-dev:
	docker-compose -f docker-compose.dev.yml down

# Command to stop the production environment
stop-prod:
	docker-compose -f docker-compose.prod.yml down
