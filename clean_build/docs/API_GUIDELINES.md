# 🌐 API Guidelines

Antigravity APIs are RESTful and adhere to strict conventions.

## Standards

1.  **Versioning**: `/api/v1/`
2.  **Resources**: Plural nouns (e.g., `/api/v1/users`)
3.  **HTTP Verbs**:
    - `GET`: Retrieve (idempotent)
    - `POST`: Create
    - `PUT`: Update (idempotent)
    - `PATCH`: Partial Update
    - `DELETE`: Remove

## Data Format

- **MIME Type**: `application/json`
- **Date/Time**: ISO 8601 UTC

## Responses

### Success

```json
{
  "status": "success",
  "data": {
    "user": { ... }
  }
}
```

### Error

```json
{
  "status": "error",
  "code": 404,
  "message": "Resource not found"
}
```

## Pagination

Use `page` and `limit` query parameters.

```
/api/v1/users?page=2&limit=20
```

## Filtering

Use query parameters.

```
/api/v1/users?role=doctor
```

## Security Headers

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## Documentation

Full OpenAPI specification is available at `/api/docs`.
