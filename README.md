# Star Wars App

A clean Laravel + React application built for simplicity and performance.

## Features

- **Laravel 12** backend with SQLite database
- **React 19** frontend with TypeScript
- **Tailwind CSS** for styling
- **Star Wars API integration** - search for characters from SWAPI

## Available Routes

- `GET /` - Main React application with character search
- `GET /api/hello` - Test Api is up
- `GET /api/search/people?name={query}` - **Search Star Wars characters from SWAPI**

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
