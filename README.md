# Secure Login Page Development with Two-Factor Authentication

This project aims to implement a robust authentication system using two-factor authentication to enhance security.

## Technologies Used
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Authentication:** Implements basic authentication followed by a 2FA challenge
- **Database:** SQLite for storing user credentials securely

## Project Setup

### Prerequisites
Ensure you have Node.js (version 14 or higher) installed on your system. npm, which comes with Node.js, will be used for managing dependencies.

### Installation
To get started with the project, follow these steps:

```bash
# Clone the repository
git clone `git@github.com:souleymane-diallo/secure-login-2fa.git`
cd secure-login-2fa

# Install backend dependencies
cd backend
npm install

# Configure Environment Variables
# Copy the `.env.example` file in each sub-project (backend and frontend) and rename it to `.env`.
# Adjust the values as needed for your local setup.

# Install frontend dependencies
cd ../frontend
npm install

# Start the backend server
cd backend
npm start

# In a separate terminal, start the frontend application
cd ../frontend
npm run dev

# Run tests backend and frontend
npm test
