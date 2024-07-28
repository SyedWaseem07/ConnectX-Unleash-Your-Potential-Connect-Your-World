# 🏥 ConnectX - Unleash Your Potential Connect Your World (Twitter like app).

## Project Overview
- Developed a real-time microblogging platform similar to Twitter
- Utilized React.js,Daisy UI for interactive front-end, and Node.js Express for back-end functionality.
- Implemented user authentication, post management, and interactive features like likes and comments.
- Integrated Cloudinary for seamless media uploads, ensuring a scalable social media experience.

## Deployement Links
- **Live Site:** https://swaseem-clinicpro.onrender.com/

## ✨ Features
- ⚛️ Tech Stack: React.js, MongoDB, Node.js, Express, Tailwind
- 🔐 Authentication with JSONWEBTOKENS (JWT)
- 🔥 React Query for Data Fetching, Caching etc.
- 👥 Suggested Users to Follow
- ✍️ Creating Posts
- 🗑️ Deleting Posts
- 💬 Commenting on Posts
- ❤️ Liking Posts
- 🔒 Delete Posts (if you are the owner)
- 📝 Edit Profile Info
- 🖼️ Edit Cover Image and Profile Image
- 📷 Image Uploads using Cloudinary
- 🔔 Send Notifications
- 🌐 Deployment
- ⏳ And much more!

## 🛠️ ConnectX Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Daisy UI](https://img.shields.io/badge/Daisy_UI-FFBDBD?style=for-the-badge&logo=daisyui&logoColor=white)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
- ![bcrypt.js](https://img.shields.io/badge/bcrypt.js-007ACC?style=for-the-badge&logo=javascript&logoColor=white)

### Database
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Third-party Tools/Libraries
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
- ![Tanstack React-Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
- ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-00D8FF?style=for-the-badge&logo=react&logoColor=white)
- 
## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running (or use cloud deployed cluster).
- React.js and vite installed and running

  - #### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SyedWaseem07/ConnectX-Unleash-Your-Potential-Connect-Your-World.git
    cd ConnectX-Unleash-Your-Potential-Connect-Your-World
    ```

2. Install server dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd frontend
    npm install
    ```

4. Create a `.env` file in the `server` directory with the following content:

    ```bash
    PORT=your_port
    MONGO_DB_URI=your_DB_URL
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token
    ACCESS_TOKEN_EXPIRY=your_access_token_expiry
    
    REFRESH_TOKEN_SECRET=your_refresh_token
    REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
    
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

   Replace `your_DB_URL` with your MongoDB connection string.

- 
1. Start the server:

    ```bash
    cd backend
    npm run dev
    ```

   The server will run on http://localhost:8000.

2. Start the client:

    ```bash
    cd frontend
    npm run dev
    ```

   The client will run on http://127.0.0.1:5173/.

3. Open your browser and visit  http://127.0.0.1:5173/ to access the ConnectX.
