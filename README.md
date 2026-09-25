# Company and Employee API

NestJS REST API with a PostgreSQL database and a one-to-many `Company` → `Employee` relationship.

## Run with Docker

Copy `.env.example` to `.env`, then run `docker compose up --build`. The API listens on port 3000 and Swagger is available at `/api/docs`.

## Endpoints

- `POST /companies`, `GET /companies`, `GET /companies/:id`, `PUT /companies/:id`, `DELETE /companies/:id`
- `POST /employees`, `GET /employees`, `GET /employees/:id`, `PUT /employees/:id`, `DELETE /employees/:id`

Employee creation requires an existing `companyId`. Deleting a company deletes its employees. `totalEmployees` is kept in sync when employees are created, moved, or deleted.
