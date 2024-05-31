# Secure Login Page Development with Two-Factor Authentication with Node Express React

This project aims to implement a robust authentication system using two-factor authentication to enhance security.
using Google Authenticator. It uses Node Express for backend and React for frontend.

## Features :
- ** User register : secure user registration with validation
- ** User Login : Secure login system
- ** Two-Factor Authentification : Intégration of Google Authenticator for enhanced security.

## Technologies Used
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Authentication:** Google Authenticator
- **Database:** SQLite for storing user credentials securely

## Project Setup

### Prerequisites
Ensure you have Node.js (version 14 or higher) installed on your system. npm, which comes with Node.js, will be used for managing dependencies.
Install Google Authenticator playstore or AppStore on your phone
### Installation
To get started with the project, follow these steps:


### Clone the repository
```
git clone `git@github.com:souleymane-diallo/secure-login-2fa.git`
cd secure-login-2fa
```
### Install backend dependencies
```
cd backend
npm install
```
### Configure Environment Variables
Copy the `.env.example` rename it to `.env`

### Install frontend dependencies
```
cd ../frontend
npm install
```
### Start the backend server
```
cd backend
npm start
```
### In a separate terminal, start the frontend application

```
cd ../frontend
npm run dev
```

### Run tests backend and frontend
npm test
