# Resume Builder

A professional, AI-powered resume building application that helps users create, manage, and optimize their resumes for job applications.
Live Links :-
Backend :- https://resume-builder-cu7h.onrender.com/
Frontend :- https://resume-builder-mpt3.vercel.app/

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Getting Started
- API Endpoints
- Environment Setup

## Features

- AI-Powered Content Generation: Enhance resume descriptions and professional summaries using Gemini AI.
- Professional Templates: Multiple layout options for different job roles.
- Dashboard Management: Create, edit, and delete multiple resumes.
- Interview Preparation: AI-driven tools to help prepare for potential job interviews.
- Export to PDF: Download resumes in standard PDF format.
- Secure Authentication: User registration and login with protected data access.

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- React Router (Routing)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose (Database)
- Gemini AI (Generative Content)
- JSON Web Token (Authentication)
- Multer & ImageKit (Image Handling)

## Project Structure

```text
Resume-Bulider/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── app/         # Redux store and slices
│   │   └── assets/      # Static files
├── server/              # Backend Express application
│   ├── configs/         # DB and service configurations
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoint definitions
│   └── middlewares/     # Auth and validation scripts
└── .gitignore           # Root git configuration
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or a remote connection string

### Installation

1. Clone the repository
2. Install Client Dependencies:
   ```bash
   cd client
   npm install
   ```
3. Install Server Dependencies:
   ```bash
   cd server
   npm install
   ```

### Running the Application

1. Start the Server:
   ```bash
   cd server
   npm run server
   ```
2. Start the Client:
   ```bash
   cd client
   npm run dev
   ```

## Environment Setup

### Client (.env)
- VITE_API_URL: Your backend server URL

### Server (.env)
- PORT: Server port number
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for token generation
- GEMINI_API_KEY: Your Google Gemini API key
- IMAGEKIT_PUBLIC_KEY: ImageKit public key
- IMAGEKIT_PRIVATE_KEY: ImageKit private key
- IMAGEKIT_URL_ENDPOINT: ImageKit URL endpoint

## License

This project is licensed under the ISC License.
