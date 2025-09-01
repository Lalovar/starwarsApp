#!/bin/sh

# Exit on any error
set -e

# Wait for database to be ready
echo "Waiting for database connection..."
while ! php -r "try { new PDO('mysql:host=mysql;dbname=starwars_app', 'starwars_user', 'starwars_password'); echo 'Database connected successfully\n'; exit(0); } catch (Exception \$e) { echo 'Database not ready, waiting...\n'; exit(1); }" 2>/dev/null; do
    sleep 2
done

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Clear and cache configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Start supervisor (for queue workers and scheduler)
echo "Starting supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
