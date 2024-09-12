# Task Management API Documentation

## Overview

This API provides CRUD operations for managing tasks. It includes user authentication with JWT, token refresh, and task management functionalities. Access to the API requires a valid access token.

## Table of Contents

- Base URL - `http://localhost:5000/api`

## API Endpoints

### Authentication

- **Endpoint:** `POST /auth/register`
- **Description:** Register a new User.
- **Authorization:** Requires a valid access token.
- **Request Body:**

  ```json
  {
    "name": "Jhon doa",
    "email": "jhon@gmail.com",
    "password": "demo123@"
  }
  ```

- **Endpoint:** `POST /auth/login`
- **Description:** Login User.
- **Authorization:** Requires a valid access token.
- **Request Body:**
  ```json
  {
    "email": "jhon@gmail.com",
    "password": "demo123@"
  }
  ```

## API Endpoints

### Create Task

- **Endpoint:** `POST /task/create`
- **Description:** Creates a new task.
- **Authorization:** Requires a valid access token.
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Endpoint:** `GET /task/get-all`
- **Description:** Get all task.
  ```json
  {
   "No data requiered"
  }
  ```
- **Endpoint:** `GET/task/:idl`
- **Description:** Get One task.

  ```json
  {
   set Id in pramam
  }

  ```

- **Endpoint:** `PUT/task/:idl`
- **Description:** Update One task.
  ```json
  {
   set Id in pramam
  }
  ```
- **Endpoint:** `DELETE/task/:idl`
- **Description:** Delete One task.
  ```json
  {
   set Id in pramam
  }
  ```

# Task Management API Setup

To set up the environment for the Task Management API, follow these instructions to configure the necessary environment variables.

## Environment Variables

You need to configure the following environment variables for your application:

- **PORT:** The port on which the server will run.
- **JWT_SECRET:** Secret key used for signing JWT access tokens.
- **JWT_REFRESH_SECRET:** Secret key used for signing JWT refresh tokens.
- **DB_URI:** MongoDB connection string for your database.

## Setting Up Environment Variables

### 1. Create a `.env` File

In the root directory of your project, create a file named `.env` if it does not already exist.

### 2. Add the Environment Variables

Open the `.env` file and add the following content:

```plaintext
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
DB_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/your-database-name?retryWrites=true&w=majority
```
