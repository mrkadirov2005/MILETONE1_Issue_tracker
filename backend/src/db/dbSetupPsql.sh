#!/bin/bash

# Get the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Load environment variables from .env file in root
export $(cat "$ROOT_DIR/.env" | grep -v '^#' | xargs)

# Run psql with PGPASSWORD (no prompt needed)
export PGPASSWORD=$DB_PASSWORD

# Connect and run schema in one command
psql -U $DB_USER -d $DB_NAME -f "$ROOT_DIR/src/db/schema.sql"

# Unset password
unset PGPASSWORD
# Update .env file with DB_NAME=issue_tracker
if grep -q "^DB_NAME=" "$ROOT_DIR/.env"; then
    # If DB_NAME exists, replace it
    sed -i 's/^DB_NAME=.*/DB_NAME=issue_tracker/' "$ROOT_DIR/.env"
else
    # If DB_NAME doesn't exist, append it
    echo "DB_NAME=issue_tracker" >> "$ROOT_DIR/.env"
fi

echo "✓ Database schema imported successfully"
echo "✓ .env file updated with DB_NAME=issue_tracker"