# Star Wars App

A Laravel + React application built for simplicity and performance.

## 🌟 Live Demo

**Visit the live application:** [https://strong-bull-gladly.ngrok-free.app/](https://strong-bull-gladly.ngrok-free.app/)

**Check out the statistics:** [https://strong-bull-gladly.ngrok-free.app/stats](https://strong-bull-gladly.ngrok-free.app/stats)

Experience the full Star Wars character database with real-time search and comprehensive statistics!

## Features

- **Laravel 12** backend with SQLite database, APIs, jobs and schedulers
- **React 19** frontend with TypeScript and **React Query caching** for optimal performance and resource efficiency
- **Tailwind CSS** for styling
- **Star Wars API integration** - search for characters from SWAPI

## 🚀 Development Commands

### Local Development

Start the Laravel development server:
```bash
php artisan serve
```

Start the Vite development server for frontend assets:
```bash
npm run dev
```

Run both Laravel and Vite servers concurrently:
```bash
composer dev
```

### Queue Processing

Start the queue worker to process background jobs:
```bash
php artisan queue:work
```

Start the queue worker with specific options:
```bash
php artisan queue:work --sleep=3 --tries=3
```

### Testing

Run all tests:
```bash
vendor/bin/pest
```

Run only unit tests:
```bash
vendor/bin/pest --testsuite=Unit
```

Run only feature tests:
```bash
vendor/bin/pest --testsuite=Feature
```

Run tests with coverage:
```bash
vendor/bin/pest --coverage
```

### Code Quality

Run ESLint to check and fix code style:
```bash
npm run lint
```

Run Prettier to format code:
```bash
npm run format
```

Check Prettier formatting without making changes:
```bash
npm run format:check
```

Run TypeScript type checking:
```bash
npm run types
```

### Database & Migrations

Run database migrations:
```bash
php artisan migrate
```

Rollback the last migration:
```bash
php artisan migrate:rollback
```

Seed the database:
```bash
php artisan db:seed
```

### Custom Commands

Compute and store search statistics:
```bash
php artisan stats:compute
```

### Docker Development

Build and start all services:
```bash
docker-compose up -d --build
```

Generate the Laravel application key inside the container:
```bash
docker-compose exec app php artisan key:generate
```

Access the application container:
```bash
docker-compose exec app bash
```

View logs:
```bash
docker-compose logs -f
```

Stop all services:
```bash
docker-compose down
```

## 🎓 Learnings

This project was built using the **Laravel React Starter Kit** and provided valuable insights into:

- **Framework Structure**: Understanding Laravel's MVC architecture and React component organization
- **Routing**: Implementing both web and API routes for seamless navigation
- **APIs**: Building RESTful endpoints for data retrieval and manipulation
- **Controllers**: Creating efficient controllers to handle business logic
- **Models**: Designing database models with proper relationships
- **Jobs**: Implementing background job processing for improved performance
- **Scheduled Jobs**: Setting up automated tasks using Laravel's task scheduler
