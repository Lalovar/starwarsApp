# Multi-stage Dockerfile for Laravel + React using SQLite

# Composer dependencies
FROM composer:2 AS vendor
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Node assets
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json ./
COPY components.json ./components.json
RUN npm run build

# Runtime image
FROM php:8.2-cli-alpine

# Install system packages and PHP extensions
RUN apk add --no-cache \
    sqlite sqlite-dev \
    oniguruma-dev \
    libzip-dev \
    zip unzip && \
    docker-php-ext-install pdo_sqlite mbstring zip

WORKDIR /var/www/html

# Copy application source
COPY . .

# Copy in dependencies and built assets
COPY --from=vendor /var/www/html/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build

# Ensure required directories exist
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
