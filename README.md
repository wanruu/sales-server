# Sales Management (Server)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Quick start](#quick-start)
    - [Project setup](#project-setup)
    - [Compile and run the project](#compile-and-run-the-project)

## Description

This is the server-side project of a sales management website that must be used in conjunction with the client side. Implemented with NestJs and PostgreSQL.

## Features

- API

## Quick start

### Project setup

```
- sales-app
    - client ⬅️ client-side project
    - server ⬅️ this project
    - docker-compose.yml
    - .env
```

```yaml
# docker-compose.yml
services:
    server-dev:
        container_name: server-dev
        build:
            context: ./server
            target: development
            dockerfile: Dockerfile
        env_file:
            - .env
        ports:
            - ${SERVER_PORT}:${SERVER_PORT}
        tty: true
        volumes:
            - ./server:/usr/src/app
            - ssh-data:/root/.ssh
        networks:
            - server-network
            - client-server-network
        environment:
            - DB_HOST=db
    client-dev:
        container_name: client-dev
        build:
            context: ./client
            target: development
            dockerfile: Dockerfile
        env_file:
            - .env
        ports:
            - ${CLIENT_PORT}:${CLIENT_PORT}
        tty: true
        volumes:
            - ./client:/usr/src/app
            - ssh-data:/root/.ssh
        networks:
            - client-server-network
    db:
        container_name: db
        image: postgres:16.6-alpine3.21
        ports:
            - ${DB_PORT}:${DB_PORT}
        tty: true
        volumes:
            - db-data:/var/lib/postgresql/data
        restart: always
        networks:
            - server-network
        environment:
            - POSTGRES_DB=${DB_NAME}
            - POSTGRES_USER=${DB_USERNAME}
            - POSTGRES_PASSWORD=${DB_PASSWORD}
    pgadmin4:
        container_name: pgadmin
        image: dpage/pgadmin4
        ports:
            - ${PGADMIN_PORT}:80
        tty: true
        volumes:
            - pgadmin4-data:/var/lib/pgadmin
        restart: always
        networks:
            - server-network
        environment:
            - PGADMIN_DEFAULT_EMAIL=${PGADMIN_EMAIL}
            - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
            - PGADMIN_CONFIG_SESSION_EXPIRATION_TIME=365
            - PGADMIN_CONFIG_MAX_SESSION_IDLE_TIME=60
        extra_hosts:
            - host.docker.internal:host-gateway

volumes:
    ssh-data:
        name: sales-ssh-data
    db-data:
        name: sales-db-data
    pgadmin4-data:
        name: sales-pgadmin4-data

networks:
    server-network:
        name: server-network
    client-server-network:
        name: client-server-network

```

### Compile and run the project

```bash
$ docker compose up
```

In docker container `server-dev`, start the server in other modes:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```