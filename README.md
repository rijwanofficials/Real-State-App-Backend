# Real Estate App – Backend (Node.js + Express + MongoDB + Firebase Auth)

This is the **backend API** for the Real Estate Web Application — a Home ,villa renting and buying and management platform with secure Firebase Authentication, property CRUD operations

It powers the React-based frontend built with Vite and Tailwind CSS.

---

## 🚀 Live API
**Base URL:** [https://real-estate-api.onrender.com](https://real-state-app-backend-38lw.onrender.com) 
---

## 🧠 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB Atlas + Mongoose**
- **Firebase Authentication**
- **CORS + dotenv**

---

## ⚙️ Features
✅ Secure **Firebase Authentication** (Login/Signup using Firebase SDK)  
✅ **Property CRUD APIs** for users and admins  
✅ **Role-based access control** (Admin/User)    
✅ **MongoDB Atlas** for database hosting  
✅ **CORS** configured for frontend access  
✅ Clean and modular folder structure  

---

## 📁 Folder Structure

dealzup-backend/
├── api/
│ └── v1/
│ ├── users/
│ │ ├── controller.js
│ │ ├── routes.js
│ │ └── dto.js
│ ├── contact/
│ │ ├── controller.js
│ │ ├── routes.js
│ │ └── dto.js
│ ├── properties/
│ │ ├── controller.js
│ │ ├── routes.js
│ │ └── dto.js
│ ├── otherRoutes
│ └── routes.js # Main router combining all subroutes
├── models/ # Mongoose schemas
├── config/ # Firebase & MongoDB setup
│ ├── db.js
│ └── firebase.js
├── .env
├── package.json
└── app.js

## ⚙️ Environment Variables
Create a `.env` file in the root folder:

PORT
MONGODB_URI=my_mongodb_connection_string

FIREBASE_PROJECT_ID=my_firebase_project_id
FIREBASE_CLIENT_EMAIL=my_firebase_client_email
FIREBASE_PRIVATE_KEY=my_firebase_private_key

---

## 🔐 Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project  
3. Enable **Email/Password Authentication**
4. Generate a **service account key (JSON file)** from  
   *Project Settings → Service Accounts → Generate new private key*
5. Copy the values into your `.env`  
6. Setup `config/firebase.js`:


# Clone repository
git clone https://github.com/rijwanofficials/dealzup-backend.git

# Move into folder
cd dealzup-backend

# Install dependencies
npm install

# Run server in development
npm run dev


Deployment

Backend: Render

Database: MongoDB Atlas

Authentication: Firebase Auth

Frontend: Vercel
