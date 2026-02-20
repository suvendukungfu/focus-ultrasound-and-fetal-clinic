#!/bin/bash

# Navigate to backend directory
cd "$(dirname "$0")"

echo "🚀 Setting up Focus Ultrasound Backend..."

# ALWAYS Install dependencies to fix missing module errors
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client (Fixes @prisma/client errors)
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Create .env if missing
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "PORT=4000" > .env
    echo "NODE_ENV=development" >> .env
    echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/focus_db\"" >> .env
    echo "JWT_SECRET=\"dev-secret-key\"" >> .env
    echo "⚠️  Please update .env with your actual database credentials!"
fi

# Run Database Migrations (Fixes table missing errors)
# echo "🗄️ Running Migrations..."
# npx prisma migrate dev --name init

# Start server
echo "✅ Starting server..."
npm run dev
