# Docker Setup for Star Wars App

This document provides instructions for running the Star Wars Laravel application using Docker.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository and navigate to the project directory**
   ```bash
   cd starwars-app
   ```

2. **Copy the Docker environment file**
   ```bash
   cp docker.env .env
   ```

3. **Generate Laravel application key**
   ```bash
   php artisan key:generate
   ```
   Or manually add a 32-character random string to the `APP_KEY` in your `.env` file.

4. **Build and start the containers**
   ```bash
   docker-compose up -d --build
   ```

5. **Access the application**
   - Main application: http://localhost:8080
   - Database: localhost:3306 (MySQL)

## Services Overview

The Docker setup includes the following services:

### 1. **app** (Laravel Application)
- PHP 8.2 with FPM
- Laravel application code
- Handles web requests via PHP-FPM

### 2. **nginx** (Web Server)
- Nginx reverse proxy
- Serves static files and proxies PHP requests to the app container
- Accessible on port 8080

### 3. **mysql** (Database)
- MySQL 8.0 database
- Persistent data storage
- Accessible on port 3306
- Database: `starwars_app`
- User: `starwars_user`
- Password: `starwars_password`

### 4. **scheduler** (Job Scheduler)
- Runs Laravel's scheduled tasks
- Executes `php artisan schedule:work`
- Handles the `stats:compute` command every 5 minutes

### 5. **queue** (Queue Worker)
- Processes background jobs
- Runs `php artisan queue:work`
- Handles job processing with retry logic

## Database Persistence

The MySQL database data is persisted using a Docker volume named `mysql_data`. This ensures that your data survives container restarts and rebuilds.

## Job Scheduling

The application includes a job scheduler that runs every 5 minutes to compute search statistics. This is handled by the `scheduler` service which runs:

```bash
php artisan schedule:work
```

## Queue Processing

Background jobs are processed by the `queue` service which runs:

```bash
php artisan queue:work --sleep=3 --tries=3 --max-time=3600
```

## Useful Commands

### Start all services
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs app
docker-compose logs scheduler
docker-compose logs queue
docker-compose logs mysql
```

### Access containers
```bash
# Laravel app container
docker-compose exec app bash

# MySQL container
docker-compose exec mysql mysql -u starwars_user -p starwars_app
```

### Run Laravel commands
```bash
# Run migrations
docker-compose exec app php artisan migrate

# Clear cache
docker-compose exec app php artisan cache:clear

# Run tests
docker-compose exec app php artisan test
```

### Rebuild containers
```bash
docker-compose down
docker-compose up -d --build
```

## Environment Configuration

The application uses the following key environment variables:

- `DB_CONNECTION=mysql` - Database driver
- `DB_HOST=mysql` - Database host (Docker service name)
- `DB_DATABASE=starwars_app` - Database name
- `DB_USERNAME=starwars_user` - Database username
- `DB_PASSWORD=starwars_password` - Database password
- `QUEUE_CONNECTION=database` - Queue driver
- `CACHE_DRIVER=file` - Cache driver
- `SESSION_DRIVER=file` - Session driver

## Troubleshooting

### Database connection issues
1. Ensure the MySQL container is running: `docker-compose ps`
2. Check MySQL logs: `docker-compose logs mysql`
3. Verify database credentials in `.env` file

### Application not accessible
1. Check if all containers are running: `docker-compose ps`
2. View application logs: `docker-compose logs app`
3. Check Nginx logs: `docker-compose logs nginx`

### Job scheduler not working
1. Check scheduler logs: `docker-compose logs scheduler`
2. Verify the scheduler container is running: `docker-compose ps`
3. Check if the command exists: `docker-compose exec app php artisan list | grep stats`

### Queue jobs not processing
1. Check queue worker logs: `docker-compose logs queue`
2. Verify the queue container is running: `docker-compose ps`
3. Check job table: `docker-compose exec app php artisan queue:failed`

## Production Considerations

For production deployment:

1. **Security**: Change default passwords and use strong credentials
2. **SSL**: Configure SSL certificates for HTTPS
3. **Backup**: Set up regular database backups
4. **Monitoring**: Add monitoring and logging solutions
5. **Scaling**: Consider using Docker Swarm or Kubernetes for scaling
6. **Environment**: Use proper environment-specific configuration files

## Development vs Production

The current setup is optimized for development. For production:

- Use proper SSL certificates
- Configure proper logging and monitoring
- Set up database backups
- Use environment-specific configuration
- Consider using Redis for caching and sessions
- Implement proper security measures
