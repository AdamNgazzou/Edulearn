# 🎓 NextLMS — A Modern Learning Management System

Welcome to **NextLMS**, a full-stack Learning Management System (LMS) built for educational institutions and course creators. It empowers instructors to manage courses, lessons, students, and track performance, while students enjoy an organized platform to learn and grow.

## 🚀 Features

### 👨‍🏫 Instructor Features
- Instructor profile with expertise and bio
- Create and manage courses, modules, and lessons
- Upload resources (PDFs, videos, GitHub links, etc.)
- Post announcements
- Track student enrollment and attendance

### 🎓 Student Features
- User registration & login (JWT authentication)
- Enroll in courses and view progress
- Access video, text, and assignment lessons
- Track attendance and course announcements
- View assigned teachers and course materials

### 🛡️ Admin Features
- Manage user roles (student, instructor, admin)
- Monitor course publishing
- Handle all user, course, and enrollment data

## 🏗️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **Auth**: JWT (JSON Web Tokens), role-based middleware
- **Hosting**: Vercel / Railway / Render *(configurable)*
- **Storage**: YouTube (Unlisted) / Cloudinary (Free tier) / GitHub for links

## 🗂️ Database Schema

Includes relational PostgreSQL tables:
- `users` (role-based: student, instructor, admin)
- `students`, `instructors`, `admins`
- `courses`, `modules`, `lessons`
- `video_lessons`, `text_lessons`, `assignment_lessons`
- `resources`, `announcements`, `enrollments`, `attendance`

> Full SQL schema is available in `/schema/schema.sql`.

## 🔐 Authentication & Authorization

- Passwords are hashed with **bcrypt**
- Protected routes using **JWT middleware**
- Custom middleware to authorize by role (`instructor`, `student`, `admin`)

## 📁 File & Video Management

- Resources can include:
  - Files (PDFs, slides)
  - Video links (hosted privately on YouTube or Vimeo)
  - GitHub repos
- Future storage options: Cloudinary (Free), Firebase Storage

## 📈 Future Enhancements

- Assignment grading & submission
- Live class scheduling
- Student messaging system
- PDF generation for completion certificates
- CI/CD with GitHub Actions

## 👨‍💻 Installation (Dev Mode)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/nextlms.git

# 2. Backend
cd server
npm install
npm run dev

# 3. Frontend
cd ../client
npm install
npm run dev
