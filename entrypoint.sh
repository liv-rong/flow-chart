#!/bin/sh

echo "window._env_ = {
}" > /usr/share/nginx/html/env-config.js

exec nginx -g "daemon off;"
