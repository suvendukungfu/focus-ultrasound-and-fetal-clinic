#!/bin/bash

# Kill any process on 4001
echo "Cleaning up port 4001..."
lsof -ti:4001 | xargs kill -9 2>/dev/null

# Clean up port 4000 just in case
echo "Cleaning up port 4000..."
lsof -ti:4000 | xargs kill -9 2>/dev/null

echo "Starting backend..."
npm run dev
