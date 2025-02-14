# User Management API

A RESTful API built with Express.js and MongoDB for user management with JWT authentication.

## Features

- User registration with validation
- User authentication using JWT
- Search users by username or email
- User profile management (view, update, delete)
- Secure password hashing
- Input validation
- Error handling
- MongoDB integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- UUID for unique identifiers

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB installed and running locally
- Postman (for testing APIs)

## Project Setup

1. Clone the repository
bash
git clone <repository-url>

2. Install dependencies
cd user-management-api
bash
npm install

3. Create `.env` file in the root directory and add the following:
env
PORT=3000
MONGODB_URI=mongodb_url
JWT_SECRET=your_jwt_secret_key

4. Start the server
bash
npm start

## API Endpoints

### Public Routes

#### 1. Register User
- **URL:** `http://localhost:3000/api/users/register`
- **Body:**
json
{
"username": "testuser",
"email": "test@example.com",
"password": "Password123",
"fullName": "Test User",
"gender": "male",
"dateOfBirth": "1990-01-01",
"country": "USA"
}
- **Response:** 
json
{
"message": "User registered successfully",
"userId": "uuid-value"
}

#### 2. Login
- **URL:** `http://localhost:3000/api/users/login`
- **Body:**
json
{
"username": "testuser",
"password": "Password123"
}
- **Response:**
json
{
"token": "jwt-token"
}

#### 3. Search Users
- **URL:** `http://localhost:3000/api/users/search?query=male`
- **Response:**
json
[
{
"id": "uuid-value",
"username": "testuser",
"email": "test@example.com",
"fullName": "Test User",
"gender": "male",
"dateOfBirth": "1990-01-01",
"country": "USA"
}
]

### Protected Routes
*Requires Authorization header with Bearer token*

#### 4. Get User Profile
- **URL:** `http://localhost:3000/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
json
{
"id": "uuid-value",
"username": "testuser",
"email": "test@example.com",
"fullName": "Test User",
"gender": "male",
"dateOfBirth": "1990-01-01",
"country": "USA"
}

#### 5. Update User
- **URL:** `http://localhost:3000/api/users/update`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
json
{
"fullName": "Updated Name",
"country": "Canada"
}
- **Response:** Updated user object

#### 6. Delete User
- **URL:** `http://localhost:3000/api/users/delete`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
json
{
"message": "User deleted successfully"
}

## Validation Rules

### Registration Validation
- Username: Minimum 3 characters
- Email: Valid email format
- Password: Minimum 8 characters, at least one letter and one number
- Full Name: Minimum 2 characters
- Gender: Must be 'male', 'female', or 'other'
- Date of Birth: Valid date format
- Country: Minimum 2 characters

### Login Validation
- Username and password are required

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or token)
- `404` - Not Found
- `500` - Server Error

Example error response:
json
{
"message": "Error message here"
}


## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:
Authorization: Bearer <your-token-here>
so for every request you have to paste the JWT token

## Testing with Postman

1. Import the provided Postman collection (if available)
2. Create a new environment and set the following variables:
   - `baseUrl`: `http://localhost:3000`
   - `token`: (will be automatically set after login)
3. Test the endpoints in the following order:
   - Register a new user
   - Login to get the token
   - Test protected routes using the token

## Development

To run the server in development mode with nodemon:
bash
npm run dev
## Project Structure
user-management-api/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── userController.js
│ ├── middleware/
│ │ ├── auth.js
│ │ └── validation.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── userRoutes.js
│ └── app.js
├── .env
├── .gitignore
└── package.json

##gitignore
in gitignore directory add .env for security measures so that others cant see mongodb credentials and jwt security key.

## Security Measures

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Input validation for all routes
- Protected routes for sensitive operations
- No password exposure in responses
- CORS enabled
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Author

VADLA SIDDIK

## Acknowledgments

- Express.js team
- MongoDB team
- JWT implementation team
