# Finance Dashboard Backend

## Overview

This is a backend system for a finance dashboard that supports user roles, financial record management, and summary analytics.

The system allows users to manage income and expense records while enforcing role-based access control.

---

## Tech Stack

Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication

---

## Features

### Authentication & Authorization

User registration and login
JWT-based authentication
Role-based access control (Viewer, Analyst, Admin)

### Financial Records

Create, update, delete records
Filter records by type, category, and date
User-specific data isolation

### Dashboard

Total income and expenses
Net balance
Category-wise breakdown
Monthly trends

### Validation & Error Handling

Input validation for all APIs
Centralized error handling

---

## API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login

### Records

POST /api/records
GET /api/records
PATCH /api/records/:id
DELETE /api/records/:id

### Dashboard

GET /api/dashboard/summary
GET /api/dashboard/trends

---

## Role Permissions

| Role    | Permissions      |
| ------- | ---------------- |
| Viewer  | View data only   |
| Analyst | View + dashboard |
| Admin   | Full access      |

---

## Setup Instructions

```bash
npm install
npm run dev
```

---

## Assumptions

Each user can only access their own records
Soft delete is used for record removal
Role-based restrictions are enforced via middleware

---

## Design Approach

The backend is structured using controllers, models, routes, and middleware to ensure separation of concerns and scalability.
The system ensures secure data handling by enforcing ownership checks and role-based access control.

---

## Author

Krishna gupta
