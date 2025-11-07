#!/bin/sh
set -e

# This script replaces placeholders in /usr/share/nginx/html/config.template.js
# with environment variables and writes /usr/share/nginx/html/config.js

if [ -f /usr/share/nginx/html/config.template.js ]; then
  echo "Generating config.js from template"
  envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
fi

exec "$@"
