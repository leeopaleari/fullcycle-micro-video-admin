#!/bin/bash

# Set permissions for the app directory
# chown -R node:node /home/node/app


if [ ! -d "/home/node/app/node_modules" ]; then
  npm install
fi

tail -f /dev/null
# Start the application
exec npm start