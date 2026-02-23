Scalable REST API with Authentication & Role-Based Access

This project is a full-stack scalable REST API system built as part of a Backend Developer Internship assignment. It demonstrates secure authentication, role-based authorization, modular architecture, cloud database integration, and a React frontend for API interaction.

Tech Stack
Backend

Node.js

Express.js

PostgreSQL (NeonDB – Cloud Hosted)

JWT Authentication

bcrypt (Password Hashing)

Swagger (API Documentation)

pg (Connection Pooling)

Frontend

React (Vite)

Axios

React Router

Features
Authentication

User Registration with hashed passwords

Secure Login with JWT

Token expiration (1 hour)

Stateless authentication

Role-Based Access Control

Two roles: USER and ADMIN

Middleware-based authorization

Admin-only route protection

Task Management (CRUD)

Create Task

Get User-Specific Tasks

Update Task Completion

Delete Task

Ownership validation (users cannot modify others’ tasks)

API Documentation

Swagger UI available at:
http://localhost:5000/api-docs

Project Structure

backend/
    src/
        modules/
            auth/
            task/
        middleware/
        config/
    package.json

frontend/
    src/
        pages/
        context/
        services/
    package.json

Setup Instructions
1. Clone Repository

git clone <your-repo-url>
cd backend-intern-project

2. Backend Setup

cd backend
npm install

Create a .env file inside backend folder:

DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run backend:

npm run dev

Swagger documentation:

http://localhost:5000/api-docs

3. Frontend Setup

cd ../frontend/frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

Security Practices Implemented

Password hashing using bcrypt

JWT-based authentication with expiration

Parameterized SQL queries (prevents SQL injection)

Role-based middleware enforcement

Input validation

Centralized error handling

Secure cloud database connection (SSL enabled)

Scalability Considerations

This project is designed with scalability and production-readiness in mind.

Docker Containerization

Backend can be containerized using Docker

Ensures consistent development and production environments

Enables easy deployment on cloud platforms

Supports horizontal scaling behind a load balancer

Redis Caching (Future Integration)

Frequently accessed endpoints (e.g., GET /tasks) can be cached using Redis

Reduces database load

Improves response time under high traffic

Can support token blacklisting and rate limiting

Enhances overall performance and scalability

Database Optimization

Indexed columns (email, user_id)

Connection pooling via pg Pool

Foreign key constraints for data integrity

ON DELETE CASCADE to prevent orphan records

Cloud-hosted PostgreSQL for production reliability

Microservices-Ready Architecture

Modular folder structure (auth, tasks, middleware)

Easily separable into independent services

Stateless JWT authentication allows horizontal scaling

Clean controller-service separation for maintainability

API Endpoints
Auth

POST /api/v1/auth/register
POST /api/v1/auth/login

Tasks

POST /api/v1/tasks
GET /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

Conclusion

This project demonstrates secure backend design principles, role-based access control, RESTful API development, cloud database integration, frontend integration, and scalable architecture considerations suitable for production deployment.
