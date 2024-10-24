# Post - Image Sharing Platform

A full-stack social media application for sharing images built with React, Node.js, Express, MongoDB, and Cloudinary.

## 📝 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features
- User authentication and authorization
- Image upload and storage using Cloudinary
- Create, read, update, and delete posts
- Like and comment on posts
- Responsive design using Tailwind CSS
- Real-time updates

## 🛠️ Tech Stack
### Frontend
- React + Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary
- JWT Authentication

## 📁 Project Structure
```
post/
├── client/               # Frontend directory
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── utils/       # Utility functions
│   │   └── App.jsx      # Main application component
│   └── vite.config.js   # Vite configuration
│
└── server/              # Backend directory
    ├── controllers/     # Request handlers
    ├── models/         # Database models
    ├── routes/         # API routes
    ├── middleware/     # Custom middleware
    ├── config/         # Configuration files
    └── index.js        # Server entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lalitkumarjangid/imageUploader.git
cd post
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Create `.env` files:

In `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

In `client/.env`:
```env
VITE_API_URL=http://localhost:5050/
```

5. Start the development servers:

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## ⚙️ Configuration

### Backend Configuration
Create a `.env` file in the server directory with the following variables:
- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### Frontend Configuration
Create a `.env` file in the client directory with:
- `VITE_API_URL`: Backend API URL

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Post Endpoints
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details
