# Frankenstein

Frankenstein - repository for studying various technologies, approaches, patterns.

## Idea

Create apps like distribution system on different technologies.

## Description

### DB

**Neo4j** - Graph DB for data with many relationship
**S3 (Minio)** - File DB

docker images

1. auth keycloak
2. balanser
3. s3 (minio)

- backet for files
- backet for frontend static

4. neo4j
5. pstgreSQL|noSQL

backends:

1. files storage
2. db graph adapter
3. postgress adapter

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- npm 9+

### Installation
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build all services
npm run build:all
```

### Running with Docker
```bash
# Start all services (databases, services, reverse proxy)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Running locally (development)
```bash
# Start frontend
npm run frontend

# Start file storage service
npm run file-storage

# Start graph db service  
npm run graph-db

# Start postgres db service
npm run postgres-db
```

### Access Points
- Frontend: http://localhost:4200
- Reverse Proxy: http://localhost:8080
- MinIO Console: http://localhost:9001
- PostgreSQL Admin: http://localhost:8282
- Neo4j Browser: http://localhost:7474

## Architecture

The project uses npm workspaces for unified dependency management. All services share a single `node_modules` folder in the root directory.