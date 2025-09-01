# Multi-stage build for Laravel application
FROM php:8.2-fpm-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    oniguruma-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Copy artisan file and essential directories for composer scripts
COPY artisan ./
COPY bootstrap ./bootstrap
COPY routes ./routes
COPY app ./app
COPY config ./config

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy remaining application files
COPY . .

# Create storage directory and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && mkdir -p storage/logs \
    && chmod -R 775 storage \
    && chown -R www-data:www-data storage

# Install Node.js for frontend assets
FROM node:18-alpine AS node

WORKDIR /var/www/html

# Copy package files
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy frontend source files
COPY resources/ ./resources/
COPY vite.config.ts tsconfig.json ./

# Build frontend assets
RUN npm run build

# Final stage
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    oniguruma-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    supervisor \
    dcron

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application from base stage
COPY --from=base /var/www/html .

# Copy built assets from node stage
COPY --from=node /var/www/html/public/build ./public/build

# Create storage directory and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && mkdir -p storage/logs \
    && mkdir -p /var/log/supervisor \
    && chmod -R 775 storage \
    && chown -R www-data:www-data storage

# Copy supervisor configuration
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy entrypoint script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose port
EXPOSE 9000

# Set entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
