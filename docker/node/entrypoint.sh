#!/bin/sh

set -e

echo "Starting application..."

# Execute the command passed to the container
exec "$@"

