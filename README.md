# 🎓 Learnament

**Learnament** is a modern, responsive educational platform designed to revolutionize skill development and class management. It bridges the gap between students, teachers, and administrators through an intuitive interface, rich features, and seamless backend connectivity. Whether you're a student looking to grow, a teacher seeking to share knowledge, or an admin managing the system — Learnament simplifies the journey.

---

## 🌐 Live Website

🔗 [Visit Learnament](https://learnament.web.app/)  
🔧 [Backend Code (GitHub)](https://github.com/rahat0078/learnament-server-code)

---

## ✨ Features

- 🔥 **Dynamic Homepage**
  - Hero slider, partner highlights, feedback carousel, and stats
- 📚 **Classes Section**
  - Shows all approved classes with name, instructor, price, and enrollment count
- 🧑‍🎓 **Student Dashboard**
  - View enrolled classes, submit assignments, evaluate instructors
- 👨‍🏫 **Teacher Dashboard**
  - Add/manage classes, track class progress, view assignments
- 🛡️ **Admin Dashboard**
  - Manage users, approve/reject teacher requests, control classes
- ✍️ **Teaching Application**
  - Users can apply to become instructors with live status tracking
- 🔐 **Authentication System**
  - Email/password login and Google sign-in
  - JWT integration to secure protected routes and ensure safe communication between frontend and backend
- 🔁 **Full CRUD Functionality**
  - Manage classes, users, and content with SweetAlert feedback
- 🌈 **Dark Mode Support**
  - Toggle between light and dark themes for better accessibility
- 🔍 **Search Functionality**
  - Easily find classes or content with search bar
- ⚡ **Optimized for Speed**
  - Efficient data fetching using **Tanstack Query**
- 🧪 **Form Handling**
  - Clean and validated forms using React Hook Form
- 🛡️ **Secure Environment**
  - Firebase and MongoDB credentials stored via `.env` variables

---

## 🛠️ Tech Stack

### 🔷 Frontend
- React.js
- Tailwind CSS
- Daisy UI
- SwiperJS
- React Hook Form
- React Router
- Tanstack Query

### 🔶 Backend
- Node.js
- Express.js
- MongoDB for databse
- JWT implementation for route protection and role-based access



### 🔐 Authentication
- Firebase Authentication for Email/Password and Google sign-in
- JWT (JSON Web Token) used for securing routes and maintaining user sessions



### 🚀 Deployment
- **Frontend**: Firebase Hosting
- **Backend**: Vercel

---

## 🔐 Admin Credentials

> You can use the following credentials to access the admin panel for testing purposes:

- **Email**: `john@doe.com`  
- **Password**: `1234jJ`

---

## ⚙️ Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rahat0078/learnament-client-code.git
   cd learnament-client-code
   npm install
   npm run dev