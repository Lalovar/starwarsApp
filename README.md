# Star Wars App

A clean Laravel + React application built for simplicity and performance.

## Features

- **Laravel 12** backend with SQLite database
- **React 19** frontend with TypeScript
- **Tailwind CSS** for styling
- **Simple API endpoints** for Star Wars data
- **No authentication** - ready for your custom needs
- **Minimal boilerplate** - only essential dependencies

## What's Included

### Backend (Laravel)
- Clean API routes (`/api/characters`, `/api/planets`)
- SQLite database configuration
- Minimal middleware setup
- No unnecessary packages or configurations

### Frontend (React)
- Single-page React application
- TypeScript support
- Tailwind CSS for styling
- Modern React patterns (hooks, functional components)

## Getting Started

1. **Install PHP dependencies:**
   ```bash
   composer install
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Create SQLite database:**
   ```bash
   touch database/database.sqlite
   ```

5. **Run migrations (if any):**
   ```bash
   php artisan migrate
   ```

6. **Build frontend assets:**
   ```bash
   npm run build
   ```

7. **Start the development server:**
   ```bash
   php artisan serve
   ```

8. **In another terminal, start Vite dev server:**
   ```bash
   npm run dev
   ```

## Available Routes

- `GET /` - Main React application
- `GET /api/characters` - Star Wars characters data
- `GET /api/planets` - Star Wars planets data
- `GET /api/health` - Health check endpoint

## Development

- **Backend development:** `php artisan serve`
- **Frontend development:** `npm run dev`
- **Build for production:** `npm run build`
- **Run tests:** `php artisan test`

## Project Structure

```
├── app/                    # Laravel application logic
├── config/                 # Configuration files
├── database/               # Database migrations and seeders
├── public/                 # Public assets and build files
├── resources/
│   ├── css/               # Tailwind CSS
│   └── js/                # React components and logic
├── routes/                 # API and web routes
└── tests/                  # Test files
```

## Customization

This app is designed to be easily customizable:

1. **Add new API endpoints** in `routes/api.php`
2. **Create new React components** in `resources/js/`
3. **Add database models** in `app/Models/`
4. **Extend with additional packages** as needed

## Dependencies

### Backend
- Laravel Framework 12
- SQLite database
- Pest testing framework

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite build tool

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
