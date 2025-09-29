#!/bin/sh

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
until mc alias set minio http://file-storage-db:9000 minioadmin minioadmin; do
  echo "MinIO is not ready yet, waiting..."
  sleep 2
done

echo "MinIO is ready!"

# Create buckets
echo "Creating buckets..."

# Create files bucket
mc mb minio/files --ignore-existing
echo "Created 'files' bucket"

# Create frontend bucket for static files
mc mb minio/frontend --ignore-existing
echo "Created 'frontend' bucket"

# Set bucket policies (make files bucket public for read access)
mc anonymous set download minio/files
echo "Set 'files' bucket to public read"

echo "Bucket initialization completed!"
