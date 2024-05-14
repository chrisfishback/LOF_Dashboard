# Notes for later review by Chris Fishback ONLY

### create spring initializer project
# Dependencies: Spring Web / JPA / Flyway / Devtools / Postgres

### npm create vite front-end 
# create this React project inside root of Spring project

### run docker
# rename application.properties to application.yaml
spring:
application:
name: Keyboard-Shortcut-Full-Stack
datasource:
driver-class-name: org.postgresql.Driver
url: jdbc:postgresql://localhost:5432/keyboard-shortcut_dev
username: dev
password: password

# create docker-compose.yaml file in root
# image to remain postgres (essentially a dependency)
version: "3.8"
services:
postgres-db:
container_name: keyboard-shortcut
image: postgres
restart: always
environment:
POSTGRES_USER: dev
POSTGRES_PASSWORD: password
POSTGRES_DB: keyboard-shortcut_dev
ports:
- "5432:5432"

# run docker compose up -d

### run bootRun
./gradlew bR

### connect database via IDE database tab

### 1. first simple table creation migration
# in DB.migration -> V1__create_shortcut_table.sql
CREATE TABLE IF NOT EXISTS SHORTCUT (
id SERIAL PRIMARY KEY NOT NULL,
shortcut TEXT NOT NULL,
description TEXT NOT NULL
)

### RERUN BOOTRUN TO RECOMPILE

### 2. first simple class-controller-service-repository for post

# create simple post http request to test functionality of API post
POST http://localhost:8080/api/shortcut
Content-Type: application/json

{
"shortcut": "Option+Command+L",
"description": "Prettify"
}

### 3. Begin writing backend tests
# use generate tool to create controller test at correct location

### 4. create API functionality for get all (and test)

### --- AS OF THIS POINT YOU SHOULD BE ABLE TO DISPLAY DATA AND POST DATA FROM FRONTEND ---

### 1. Display get all data from backend DB 
# import axios
# add @CrossOrigin in API controller for temporary insecure solution for testing

### 2. setup Vitest 
# https://vitest.dev/guide/
# npm i -D vitest
# create vitest.config.ts, vitest.setup.ts
# npm i msw
# npm i @testing-library/react
# create mocks in src and add handlers.ts node.ts
# create __tests__ folder
# Now write a test!

