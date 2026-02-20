# Focus Ultrasound & Fetal Clinic — Ultra Enterprise Backend

A production-ready Enterprise SaaS Backend built with **Node.js**, **Express**, **TypeScript**, and **Clean Architecture**.

## 🏗 Architecture

The project follows strict Clean Architecture principles to ensure modularity, scalability, and testability.

```
src/
├── config/             # Environment configuration
├── core/               # Shared core logic (Logger, AppError)
├── modules/            # Vertical Slices / Business Modules
│   ├── auth/           # Authentication & Authorization (JWT, RBAC)
│   ├── patients/       # CRM & Leads Management
│   ├── appointments/   # (Planned) Appointment Booking
│   ├── services/       # (Planned) Medical Services
│   └── analytics/      # (Planned) Analytics Engine
├── shared/             # Shared Infrastructure
│   ├── infra/
│   │   ├── http/       # Express App, Server, Middleware, Routes
│   │   └── database/   # Prisma Client
└── server.ts           # Entry Point
```

## 🚀 Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Logging:** Winston
- **Security:** Helmet, CORS, BCrypt, JWT
- **Validation:** Zod (recommended for DTO validation)

## 🛠 Setup & Installation

1. **Install Dependencies**

   ```bash
   cd focus-backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root:

   ```env
   PORT=4000
   NODE_ENV=development
   DATABASE_URL="postgresql://user:password@localhost:5432/focus_db"
   JWT_SECRET="super-secret-key-change-this"
   ```

3. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run Server**
   ```bash
   npm run dev
   ```

## 🔑 Key Features Implemented

### 1. Authentication Module (`/api/v1/auth`)

- **Register:** `POST /register`
- **Login:** `POST /login` (Returns JWT)
- **Middleware:** `ensureAuthenticated` extracts user ID and Role.

### 2. CRM / Leads Module (`/api/v1/leads`)

- **Create Lead:** `POST /` (Public endpoint for website forms)
- **List Leads:** `GET /` (Protected endpoint for Admin dashboard)
- **Repository Pattern:** Logic decoupled from Prisma for easier testing.

## 📝 How to Add a New Module

To add the **Appointments** module, for example:

1. Create `src/modules/appointments/`
2. Define DTOs (`dtos/ICreateAppointmentDTO.ts`)
3. Create Repository Interface & Implementation (`repositories/IAppointmentsRepository.ts`)
4. Implement UseCase (`useCases/CreateAppointment/CreateAppointmentUseCase.ts`)
5. Create Controller (`useCases/CreateAppointment/CreateAppointmentController.ts`)
6. Define Routes (`infra/http/routes/appointments.routes.ts`)
7. Register in `src/shared/infra/http/routes/index.ts`

## 🔒 Security Best Practices

- **Helmet** for secure HTTP headers.
- **CORS** configured for specific origins.
- **Audit Logging** middleware tracks every request.
- **AppError** centralized error handling ensures consistent API responses.
