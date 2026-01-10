# FANTASTIC 4

<img width="1536" height="1024" alt="navx lg" src="https://github.com/user-attachments/assets/a8e8475c-ea94-45c5-8383-8483d6a67888" />


# Deployment Links
User Side: https://nav-x-five.vercel.app/navigate

Admin Side: https://nav-x-five.vercel.app/admin


Demo Video Link (User Pannel) 
https://drive.google.com/file/d/12oYLuqPKdzuLeeI3xmOHRXMqgppZ_io3/view?usp=drivesdk

Demo Video Link(Admin Pannel)
https://drive.google.com/file/d/1LhHeYyNb0umdKHcWokzJStHdOk-NDESG/view?usp=drivesdk




# Indoor Navigation System

An Indoor Navigation System for a complex indoor spaces using Multi-Map Navigation with Gateway Nodes, powered by Firebase Firestore and Google Gemini AI.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **AI**: Google Gemini 2.5 Flash (Intent Detection)
- **Graphics**: HTML5 Canvas & SVG
- **State Management**: React Hooks

## Features

- **Multi-Map Navigation** across Campus, Building, and Floor levels
- **Gateway Nodes** for seamless transitions between maps
- **AI-Powered Chatbot** using Google Gemini for natural language navigation
- **Real-time Pathfinding** with Dijkstra algorithm
- **Interactive Canvas** with touch/mouse support
- **Mobile Responsive** with native-like animations
- **Firebase Backend** for real-time data storage
- **Fast Performance** with Next.js 16 and Turbopack

**Set up environment variables**

Create a `.env` file in the root directory:

```bash
# Firebase Client SDK (Browser-side) - Public variables
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"

# OR use service account file (recommended)
FIREBASE_SERVICE_ACCOUNT="content of service-account.json"

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# App Settings
NEXT_PUBLIC_USE_DATABASE=true
```
