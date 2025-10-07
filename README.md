# Social Media Backend

A robust and scalable backend for a social media platform built with NestJS. This project provides the core functionalities for a modern social feed, including creating posts, commenting, reporting, and more.

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **Feed Management**: Create, read, and manage feed posts.
- **Text & Image Posts**: Users can create posts with text content and up to four images.
- **Commenting System**: Users can comment on feed posts.
- **Reporting System**: Users can report inappropriate feeds. A feed is automatically hidden after being reported by three unique users.
- **Image Uploads**: Handles image uploads and storage using the Cloudinary service.
- **Caching**: Implements Redis caching for fast feed listing performance.
- **Error Logging**: Global error handler that logs all server errors to a MongoDB database.
- **API Documentation**: Auto-generated API documentation using Swagger.

## Technologies Used

- **Framework**: [NestJS](https://nestjs.com/)
- **Database (Transactional)**: [PostgreSQL](https://www.postgresql.org/)
- **Database (Logging)**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Caching**: [Redis](https://redis.io/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) (JWT Strategy)
- **Validation**: class-validator, class-transformer

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Redis](https://redis.io/docs/getting-started/installation/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd social-media-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project directory and add the following environment variables. Replace the placeholder values with your actual credentials and connection strings.

```env
# PostgreSQL Connection URL
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://user:password@localhost:5432/social_media"

# MongoDB Connection URL
# Format: mongodb://HOST:PORT/DATABASE
MONGO_URL="mongodb://localhost:27017/social_media_logs"

# Redis Connection URL
# Format: redis://HOST:PORT
REDIS_URL="redis://localhost:6379"

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Application Port
PORT=3000

# JWT Secret Key
JWT_SECRET="your_super_secret_key"
```

### 4. Run Database Migrations

Prisma will set up the database schema in your PostgreSQL database based on the schema file.

```bash
npx prisma migrate dev --name init
```

## Running the Application

- **Development Mode**: Starts the application with hot-reloading.

  ```bash
  npm run start:dev
  ```

- **Production Mode**: Builds and starts the application for production.

  ```bash
  npm run build
  npm run start:prod
  ```

## Running Tests

- **Unit Tests**:

  ```bash
  npm run test
  ```

- **End-to-End (E2E) Tests**:

  ```bash
  npm run test:e2e
  ```

## API Documentation

Once the application is running, you can access the Swagger UI for interactive API documentation at:

[http://localhost:3000/api](http://localhost:3000/api)

## Project Structure

The project follows a modular architecture, with features separated into their own modules (e.g., `feeds`, `users`, `comments`). Core functionalities like database connections, caching, and error handling are organized within the `src/core` directory. This structure promotes separation of concerns and maintainability.