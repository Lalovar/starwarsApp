#!/bin/bash

# Docker Setup Script for Star Wars App
echo "🚀 Setting up Docker environment for Star Wars App..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Copying Docker environment file..."
    cp docker.env .env
    echo "✅ Environment file created"
else
    echo "ℹ️  .env file already exists"
fi

# Generate Laravel application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating Laravel application key..."
    # Generate a random 32-character key
    APP_KEY=$(openssl rand -base64 32)
    sed -i.bak "s/APP_KEY=/APP_KEY=base64:$APP_KEY/" .env
    echo "✅ Application key generated"
else
    echo "ℹ️  Application key already set"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p storage/logs
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
chmod -R 775 storage

echo "🐳 Building and starting Docker containers..."
docker-compose up -d --build

echo "⏳ Waiting for services to start..."
sleep 10

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ All containers are running!"
    echo ""
    echo "🌐 Access your application at: http://localhost:8080"
    echo "🗄️  Database is accessible at: localhost:3306"
    echo ""
    echo "📊 To view logs: docker-compose logs"
    echo "🛑 To stop: docker-compose down"
    echo "🔄 To restart: docker-compose restart"
else
    echo "❌ Some containers failed to start. Check logs with: docker-compose logs"
    exit 1
fi
