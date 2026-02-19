# 🏥 Enterprise Architecture Overview

Google Antigravity adheres to a modular, scalable architecture designed for high availability and maintainability.

## 🏗 High-Level Design

```mermaid
graph TD
    User([Patient/User]) --> LB[Load Balancer]
    LB --> FE[Frontend (React/Vite)]
    FE --> API[API Gateway]
    API --> S1[Auth Service]
    API --> S2[Patient Service]
    API --> S3[Appointment Service]
    S1 --> DB[(PostgreSQL)]
    S2 --> DB
    S3 --> DB
    S3 --> Notification[Notification Service]
```

## Layers

1.  **Presentation Layer**: React + Tailwind CSS (Vite build)
2.  **Application Layer**: Business logic and orchestrators
3.  **Domain Layer**: Core entities and rules
4.  **Infrastructure Layer**: Database access, external APIs

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (implied/future)
- **Database**: PostgreSQL
- **DevOps**: GitHub Actions, Docker

## Data Flow

Data flows strictly from Presentation -> Application -> Domain -> Infrastructure. Dependencies point inwards.
