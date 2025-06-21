# 🛠️ Node.js Backend Project

This repository contains a full-featured backend project built using **Node.js** and **Express.js**, developed as part of my learning journey under the guidance of [Hitesh Choudhary](https://www.youtube.com/@HiteshChoudharydotcom).

## 🚀 Overview

This backend application is designed with modern and scalable architecture principles. It integrates essential backend development practices and tools commonly used in production-grade systems.

### ✅ Features

* **Authentication & Authorization**

  * Secure login/signup using **JWT (JSON Web Tokens)**
  * Support for **Access Tokens** and **Refresh Tokens**
  * Password hashing with **bcrypt**

* **Database Integration**

  * **MongoDB** for data storage
  * **Mongoose** for schema definition and query handling

* **Security & Standards**

  * Encrypted password storage
  * Token-based authentication and session management
  * Middleware for route protection

* **Project Structure**

  * Modular and scalable folder architecture
  * Environment variable support for config management

## 🧰 Tech Stack

* **Node.js** (runtime)
* **Express.js** (framework)
* **MongoDB** (database)
* **Mongoose** (ODM)
* **JWT** (authentication)
* **bcrypt** (password hashing)

## 📁 Folder Structure

```
.
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middlewares/        # Custom middleware functions
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── utils/              # Utility functions
├── .env                # Environment variables
├── server.js           # App entry point
└── README.md           # Project overview
```

## 📌 Installation & Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Navigate to the directory:

   ```bash
   cd project-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add your environment variables (MongoDB URI, JWT secrets, etc.)

5. Run the development server:

   ```bash
   npm run dev
   ```

## 🙌 Acknowledgements

* Thanks to **Hitesh Choudhary** for the mentorship and guidance during this project.
* Inspired by real-world backend architectures.

---
