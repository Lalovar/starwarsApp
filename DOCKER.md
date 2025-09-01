# Docker Setup

This project includes a lightweight Docker configuration for running the Laravel + React application with SQLite.

## Prerequisites
- Docker 20+
- Docker Compose v2

## Usage

```bash
cp .env.example .env
# create empty sqlite database
mkdir -p database
[ -f database/database.sqlite ] || touch database/database.sqlite

# build and start containers
docker compose up -d --build
```

The application will be available at http://localhost:8080.

### Services
- **app** – serves the Laravel application and frontend assets
- **queue** – runs `php artisan queue:work`
- **scheduler** – runs `php artisan schedule:work`

All services share the same image built from the `Dockerfile` and use the SQLite database file at `database/database.sqlite`.

### Common Commands
```bash
# stop containers
docker compose down

# view logs
docker compose logs -f
```
