# PREPNOVA 🚀

## About the Project

PREPNOVA is a full-stack placement preparation platform designed to help students prepare for technical placements in an organized way.

It brings learning resources, practice, projects, interview preparation, user authentication, and personalized progress tracking together in one platform.

## Features

- 📚 Learning resources for Java, DSA, Web Development, and Python
- 🔎 Resource search and filtering
- 📊 Personalized learning progress tracker
- 💾 Progress stored in MongoDB
- 🔐 User authentication with Sign Up and Login
- 🔑 JWT-based authentication
- 🚪 Logout functionality
- 🧭 Interactive navigation
- 🖱️ Interactive learning cards
- 🎯 Placement-focused preparation

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt.js
- CORS
- dotenv

## Project Structure

PREPNOVA/
- index.html
- script.js
- README.md
- .gitignore
- backend/
  - server.js
  - package.json
  - models/
    - User.js
- style/
  - style.css

## How It Works

1. Users can create an account using the Sign Up form.
2. User passwords are securely hashed before being stored.
3. Users can log in using their registered credentials.
4. Successful login generates a JWT authentication token.
5. Authenticated users can save their learning progress.
6. Progress is stored in MongoDB and loaded again when the user returns.

## Deployment

- Frontend: GitHub Pages
- Backend: Render
- Database: MongoDB Atlas

## Future Scope

- Personalized dashboards
- More quizzes and practice questions
- Additional learning roadmaps
- Advanced interview preparation features
- More user-specific learning analytics

## Purpose

The goal of PREPNOVA is to provide students with a simple, organized, and practical platform for placement preparation.

## Author

Developed as a personal full-stack web development project.