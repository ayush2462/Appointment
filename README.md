# 🩺 Prescripto - Doctor Appointment & Healthcare Management Platform

Prescripto is a comprehensive, full-stack healthcare management system built with the MERN stack (MongoDB, Express, React, Node.js). The platform connects patients with verified specialist doctors, provides administrative and clinical portals for clinic operations, and features a robust HR and Careers management portal.

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
| **Patient Portal** | React, Vite, Tailwind CSS | `http://localhost:5173` | Doctor Search, Slot Booking, Prescriptions, Careers Tracker |
| **Admin & Doctor Portal** | React, Vite, Tailwind CSS | `http://localhost:5174` | Doctor Management, Job Postings, Patient Inquiries |

---

## ✨ System Architecture & Core Features

### 👤 1. Patient & Public Portal (`frontend`)
- **Browse & Filter Doctors**: Search doctors dynamically managed by the backend (only active departments added by Admin are visible).
- **Smart Appointment Booking**: 7-day slot availability checker with instant confirmation.
- **My Appointments Dashboard**:
  - Filter by *All*, *Upcoming*, *Completed*, or *Cancelled*.
  - **Google Calendar Integration**: One-click add appointment to Google Calendar.
  - **Prescription & Medical Records**: View meeting diagnosis and prescription sent by your doctor.
- **Patient Profile**: Edit personal details, contact info, address, gender, and date of birth synced with backend.
- **India-Localized Contact Page**: Accurate Indian corporate HQ details, emergency helplines, and standard patient inquiry forms.
- **Public Job Portal & Application Tracker**: 
  - Candidates can view active medical/clinical job openings and apply seamlessly.
  - Generates a unique **Tracking ID** for candidates to securely track their application status without needing an account.
  - Candidates with a `Selected` status can securely upload **Formality Documents** (e.g., Medical Licenses, ID Proofs) directly to the portal.

### 🛡️ 2. Admin Panel (`admin` - Admin Role)
- **Overview Dashboard**: Track overall doctor count, patient count, total appointments, and recent activity.
- **Manage Doctors**:
  - **Add/Edit/Delete**: Complete CRUD for doctors, including Cloudinary integration with an intelligent Base64 fallback if API keys fail.
  - **Availability Toggle**: Real-time availability switch.
- **Department Master**:
  - Dynamically add, edit, or delete hospital departments. Only active departments are visible to patients on the frontend.
- **Patient Inquiries Management**:
  - View contact queries submitted by patients and update their status (e.g., *Pending*, *Responded*).
- **HR & Job Portal Management**:
  - **Manage Job Openings**: Create, edit, and close job postings dynamically.
  - **Manage Applications**: Review candidate applications, update status (`Under Review`, `Selected`, `Hired`), leave HR notes, and verify uploaded Formality Documents.
- **All Appointments**: Comprehensive view of all patient bookings across the clinic with cancellation options.

### 🩺 3. Doctor Portal (`admin` - Doctor Role)
- **Doctor Login**: Separate secure login for individual doctors (`/api/doctor/login`).
- **Doctor Dashboard**: Track total consultation earnings (in ₹), treated patient count, and upcoming schedules.
- **Patient Records & Prescriptions**:
  - View booked patients with age, appointment slot, and consultation fee.
  - **Complete & Send Patient Record**: Interactive modal to write **Meeting Notes / Diagnosis** and **Prescriptions / Medications** directly sent to the patient's portal.
- **Doctor Profile**: Toggle individual consultation status.

---

## 🛠️ Technology Stack

- **Frontend & Admin/Doctor Portal**: React 18, Vite, Tailwind CSS, React Router DOM, Axios, React Toastify, Lucide-React.
- **Backend API**: Node.js (ES Modules), Express.js, Mongoose (MongoDB Atlas), Cloudinary API, JWT (JSON Web Tokens), Bcrypt, Multer (File Uploads).
- **Concurrently**: Multi-service runner.

---

## ⚙️ Environment Variables Setup

Ensure `backend/.env` contains the following configuration:

```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=adminpassword

PORT=3000

# Optional: If Cloudinary fails, the backend will automatically fallback to Base64 Database storage.
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
```

---

## 📁 Repository Structure

```
Appointment/
├── backend/                  # Express REST API & Database Models
│   ├── config/               # MongoDB, Cloudinary Config
│   ├── controllers/          # Admin, User, Doctor, Job & Dept Logic
│   ├── middlewares/          # Auth JWT & Multer Uploads
│   ├── models/               # Job Applications, Inquiries, Doctors Schemas
│   ├── routes/               # Express Routes
│   ├── package.json          # Dependencies & dev:all script
│   └── server.js             # API Entry Point
├── frontend/                 # Patient Web Application
│   ├── src/
│   │   ├── components/       # Tracker UI, SpecialityMenu, Navbar
│   │   ├── context/          # AppContext State
│   │   └── pages/            # Contact/Careers, Appointments, Profile
├── admin/                    # Admin & Doctor Web Application
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar
│   │   ├── context/          # AdminContext & DoctorContext
│   │   └── pages/            # Admin (HR, Dept Master) & Doctor Dashboard
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
