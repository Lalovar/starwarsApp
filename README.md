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

## Run with docker

Build images

```docker-compose up -d --build```

Generate the Laravel application key inside the container:

```docker-compose exec app php artisan key:generate```

## 🎓 Learnings

This project was built using the **Laravel React Starter Kit** and provided valuable insights into:

- **Framework Structure**: Understanding Laravel's MVC architecture and React component organization
- **Routing**: Implementing both web and API routes for seamless navigation
- **APIs**: Building RESTful endpoints for data retrieval and manipulation
- **Controllers**: Creating efficient controllers to handle business logic
- **Models**: Designing database models with proper relationships
- **Jobs**: Implementing background job processing for improved performance
- **Scheduled Jobs**: Setting up automated tasks using Laravel's task scheduler
