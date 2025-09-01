# Star Wars App

A clean Laravel + React application built for simplicity and performance.

## Features

- **Laravel 12** backend with SQLite database, api's, jobs and schedulers.
- **React 19** frontend with TypeScript
- **Tailwind CSS** for styling
- **Star Wars API integration** - search for characters from SWAPI

## Run with docker

Build images

```docker-compose up -d --build```

Generate the Laravel application key inside the container:

```docker-compose exec app php artisan key:generate```

## Available Routes
