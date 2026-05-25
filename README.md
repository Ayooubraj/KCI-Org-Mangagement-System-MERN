# KCI Org Management System (MERN)

<h3 align="center">
A full-stack MERN application to manage organization workflow.<br>
Built to simplify administration, track performance, and improve communication across the system.
</h3>

---

# About

**KCI Org Management System** is a web-based application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This project focuses on managing core academic and organizational tasks such as handling students, teachers, classes, subjects, attendance, and performance tracking — all in one place.

---

# Features

* **Role-Based Access**

  * Admin, Staff and Student roles with different permissions and dashboards.

* **Admin Controls**

  * Add/manage students, teachers, classes, and subjects
  * Monitor overall system activity

* **Student Management**

  * Store and manage student records
  * View attendance and academic performance

* **Teacher Functionalities**

  * Manage assigned classes and subjects
  * Mark attendance and update student data

* **Attendance System**

  * Track daily attendance
  * Maintain organized records

* **Performance Tracking**

  * Add marks and evaluate student progress

* **Dashboard & UI**

  * Clean UI with charts and tables for better visualization

---

# Tech Stack

**Frontend**

* React.js
* Material UI
* Redux

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Ayooubraj/KCI-Org-Mangagement-System-MERN.git
cd KCI-Org-Mangagement-System-MERN
```

---

## 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file inside the backend folder:

```env
MONGO_URL=mongodb://127.0.0.1:27017/kci_org
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 4. Run the App

* Frontend → http://localhost:3000
* Backend → http://localhost:5000

---

# Notes

* Make sure MongoDB is running locally or use MongoDB Atlas
* Do NOT upload your `.env` files to GitHub
* If API requests fail, double-check your backend URL in frontend config

---

# Future Improvements

* Authentication improvements (JWT handling & security)
* Better UI/UX enhancements
* Deployment setup (Render / Vercel)
* Real-time notifications

---

# Deployment

* Backend: Render (recommended)
* Frontend: Netlify / Vercel

---

# Author

Developed by **Ayooub**

---

⭐ If you find this project useful, consider giving it a star!
