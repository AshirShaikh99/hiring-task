# Installation

# Clone the repository

git clone [repository-url]

# Install dependencies

cd backend
npm install

# Configure environment variables

.env

# Edit .env with your database credentials and JWT secret

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=todo_db
JWT_SECRET=your_secret_key

# Start the Server

npm run dev

# Register User

POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123",
"name": "John Doe"
}

# Login User

POST http://localhost:8000/api/v1/auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

# Todo Endpoints

### Note: Include the JWT token in all todo requests:

Authorization: Bearer your_jwt_token

# Create Todo

POST http://localhost:8000/api/v1/todos
Content-Type: application/json

{
"title": "Complete Project",
"description": "Finish the todo app",
"dueDate": "2024-12-31"
}

# Get All Todos

GET http://localhost:8000/api/v1/todos

# Update Todo

PUT http://localhost:8000/api/v1/todos/{todoId}
Content-Type: application/json

{
"title": "Updated Title",
"description": "Updated description",
"completed": true,
}

# Delete Todo

DELETE http://localhost:8000/api/v1/todos/{todoId}
