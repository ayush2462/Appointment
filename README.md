# 🩺 Prescripto - Doctor Appointment & Healthcare Management Platform

Prescripto is a full-stack doctor appointment booking and clinic management system built with the MERN stack (MongoDB, Express, React, Node.js). The platform connects patients with verified specialist doctors and provides administrative and clinical portals for clinic operations.

---

## 🚀 Quick Start (Run Everything with 1 Command)

You can launch the **Backend API**, **Patient Frontend**, and **Admin/Doctor Portal** simultaneously using `concurrently`:

```bash
# Navigate to the backend directory and run:
cd backend
npm run dev:all
```

Or from the project root folder:
```bash
npm --prefix backend run dev:all
```

---

## 🌐 Application Services & Ports

| Application | Technology | URL | Key Features |
| :--- | :--- | :--- | :--- |
| **Backend API** | Node.js, Express, MongoDB | `http://localhost:3000` | REST API, Auth, Cloudinary/Base64 Image Storage |
| **Patient Portal** | React, Vite, Tailwind CSS | `http://localhost:5173` | Doctor Search, Slot Booking, Prescriptions, Profile |
| **Admin & Doctor Portal** | React, Vite, Tailwind CSS | `http://localhost:5174` | Doctor Management, Doctor Login, Patient Consultation Records |

---

## ✨ System Architecture & Core Features

### 👤 1. Patient Portal (`frontend`)
- **Browse & Filter Doctors**: Search doctors by speciality (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, etc.).
- **Smart Appointment Booking**: 7-day slot availability checker with instant confirmation toast messages.
- **My Appointments Dashboard**:
  - Filter by *All*, *Upcoming*, *Completed*, or *Cancelled*.
  - **Google Calendar Integration**: One-click add appointment to Google Calendar.
  - **Prescription & Medical Records**: View meeting diagnosis and prescription sent by your doctor after consultation.
- **Patient Profile**: Edit personal details, contact info, address, gender, and date of birth synced with backend.

### 🛡️ 2. Admin Panel (`admin` - Admin Role)
- **Overview Dashboard**: Track overall doctor count, patient count, total appointments, and recent activity.
- **Manage Doctors**:
  - **Add Doctor**: Upload doctor profile photo (Cloudinary with Base64 URI fallback), set speciality, experience, fees (in ₹), and clinic address.
  - **Edit Doctor**: In-place modal to modify doctor information.
  - **Delete Doctor**: Instant doctor deletion with confirmation.
  - **Availability Toggle**: Real-time availability switch.
- **All Appointments**: Comprehensive view of all patient bookings across the clinic with cancellation options.

### 🩺 3. Doctor Portal (`admin` - Doctor Role)
- **Doctor Login**: Separate secure login for individual doctors (`/api/doctor/login`).
- **Doctor Dashboard**: Track total consultation earnings (in ₹), treated patient count, and upcoming schedules.
- **Patient Records & Prescriptions**:
  - View booked patients with age, appointment slot, and consultation fee.
  - **Complete & Send Patient Record**: Interactive modal to write **Meeting Notes / Diagnosis** and **Prescriptions / Medications** directly sent to the patient's portal.
- **Doctor Profile & Availability**: Toggle individual consultation status.

---

## 🛠️ Technology Stack

- **Frontend & Admin/Doctor Portal**: React 18, Vite, Tailwind CSS, React Router DOM, Axios, React Toastify.
- **Backend API**: Node.js (ES Modules), Express.js, Mongoose (MongoDB Atlas), Cloudinary API, JWT (JSON Web Tokens), Bcrypt.
- **Concurrently**: Multi-service runner.

---

## ⚙️ Environment Variables Setup

Ensure `backend/.env` contains the following configuration:

```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=adminpassword

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
```

---

## 📁 Repository Structure

```
Appointment/
├── backend/                  # Express REST API & Database Models
│   ├── config/               # MongoDB, Cloudinary & Polyfills
│   ├── controllers/          # Admin, User & Doctor Logic
│   ├── middlewares/          # Auth JWT & Multer Uploads
│   ├── models/               # Doctor, User & Appointment Schemas
│   ├── routes/               # Express Routes
│   ├── package.json          # Dependencies & dev:all script
│   └── server.js             # API Entry Point
├── frontend/                 # Patient Web Application
│   ├── src/
│   │   ├── components/       # UI Components
│   │   ├── context/          # AppContext State
│   │   └── pages/            # Appointment, MyProfile, MyAppointment
├── admin/                    # Admin & Doctor Web Application
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar
│   │   ├── context/          # AdminContext & DoctorContext
│   │   └── pages/            # Admin & Doctor Dashboard/Appointments Pages
└── README.md                 # Documentation
```

---

## 📜 Standard Installation & Individual Start Commands

If you prefer to start each service individually:

1. **Start Backend Server**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Patient Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Start Admin & Doctor Portal**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```
