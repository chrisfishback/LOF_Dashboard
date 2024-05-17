# Notes for later review by Chris Fishback ONLY

### create spring initializer project
# Dependencies: Spring Web / JPA / Flyway / Devtools / Postgres

### npm create vite front-end 
# create this React project inside root of Spring project

### run docker
# rename application.properties to application.yaml (in main.resources)
spring:
    application:
        name: LoF_Dashboard
    datasource:
        driver-class-name: org.postgresql.Driver
        url: jdbc:postgresql://localhost:5432/lof_dashboard_dev
        username: dev
        password: password

# create docker-compose.yaml file in root
# image is a postgres image (essentially a dependency)
version: "3.8"
services:
    postgres-db:
        container_name: lof_dashboard
        image: postgres
        restart: always
        environment:
            POSTGRES_USER: dev
            POSTGRES_PASSWORD: password
            POSTGRES_DB: lof_dashboard_dev
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

### --- AT THIS POINT YOU SHOULD BE ABLE TO DISPLAY AND POST DATA FROM FRONTEND ---

### 1. Display get all data from backend DB 
# npm i axios
# npm i msw
# npm i @testing-library/react

### 2. setup Vitest - front-end testing
# https://vitest.dev/guide/
# npm i -D vitest

## update vite.config.ts
# add the proxy for testing and cross-origin functionality
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
server: {
port: 3000,
proxy: {
'/api': {
target: 'http://localhost:8080',
changeOrigin: true,
}
}
}
})

## create vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],
test: {
environment: 'jsdom',
globals: true,
setupFiles: ['./vitest.setup.ts'],
},
})

## create vitest.setup.ts
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

## create mocks directory in src and add handlers.ts node.ts
# handlers.ts (shortcut is the object in this example) (set up test data)
import {HttpResponse, http} from "msw";

const testShortcut = [ 
{
id: 1,
shortcut: 'Option+Control+L',
description: 'Prettify',
},
{
id: 2,
shortcut: 'Command+C',
description: 'Copy',
}
]

export const handlers = [
http.get('/api/shortcut', () => {
return HttpResponse.json(testShortcut)
}),
]

# node.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

## create __tests__ folder (in src)
# Now write a test!

