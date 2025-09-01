-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS starwars_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant privileges to the application user
GRANT ALL PRIVILEGES ON starwars_app.* TO 'starwars_user'@'%';
FLUSH PRIVILEGES;
