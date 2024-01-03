# Project Readme

## Introduction

This project consists of authentication and note-related APIs implemented using Node.js and Express. Below are the details of the available routes and instructions on how to run the code and run tests.

## Routes

### Authentication APIs

- **POST /auth/signup**
  - Create a new user account.
  - Example: `POST /api/auth/signup`

- **POST /auth/login**
  - Authenticate a user and generate a token.
  - Example: `POST /api/auth/login`

### Note APIs

- **GET /notes**
  - Retrieve all notes for the authenticated user.
  - Example: `GET /api/notes`

- **GET /notes/:id**
  - Retrieve a specific note by ID for the authenticated user.
  - Example: `GET /api/notes/:id`

- **POST /notes**
  - Create a new note for the authenticated user.
  - Example: `POST /api/notes`

- **PUT /notes/:id**
  - Update a specific note by ID for the authenticated user.
  - Example: `PUT /api/notes/:id`

- **DELETE /notes/:id**
  - Delete a specific note by ID for the authenticated user.
  - Example: `DELETE /api/notes/:id`

- **POST /notes/:id/share**
  - Share a specific note with another user.
  - Example: `POST /api/notes/:id/share`

- **GET /search?**
  - Search for notes based on a query string for the authenticated user.
  - Example: `GET /api/search?q=test`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT = '3001'

# DB

DB_NAME = 'your_db_name'
DB_USERNAME = 'your_db_username'
DB_PASSWORD = 'your_db_password'
DB_HOST = 'localhost'
DB_DIALECt = 'mysql'

# jwt
SECRET_KEY = 'speer'

## How to Run

To run the code, use the following commands:

```bash
# Install dependencies
npm install

# Run the application with nodemon
nodemon index.js
# or
node index.js

# Run Test
npm test
