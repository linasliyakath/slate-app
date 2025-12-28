# Slate - Minimalist Task Management App

Slate is a professional-grade, minimalist task management application designed for productivity and focus. Built with a modern tech stack (Next.js, TypeScript, Clerk, and MongoDB), it offers a seamless experience for managing personal objectives with a clean, high-contrast aesthetic.

## 🚀 Project Overview

Slate provides a streamlined interface for users to capture and track their tasks. The application emphasizes speed and simplicity, utilizing a master-detail layout that allows users to browse their task list and manage specific task details without losing context.

### Core Features
- **User Authentication**: Secure sign-up, sign-in, and profile management via Clerk.
- **Task Management**: Full CRUD (Create, Read, Update, Delete) capabilities.
- **Data Isolation**: Each user manages their own private database of tasks.
- **Master-Detail Flow**: Persistent sidebar for quick navigation between tasks.
- **Minimalist Design**: A premium black-and-white UI optimized for clarity and reduced cognitive load.

---

## 🛠️ Tech Stack

### Framework: [Next.js (App Router)](https://nextjs.org/)
Chosen for its superior performance, React Server Components (RSC), and robust routing system. The App Router enables efficient server-side rendering and simplified data fetching.

### Language: [TypeScript](https://www.typescriptlang.org/)
Ensures Type safety across the entire codebase, reducing runtime errors and improving developer productivity with clear interfaces and models.

### Styling: [Tailwind CSS](https://tailwindcss.com/)
A utility-first CSS framework used to build a beautiful, custom-designed interface without the overhead of heavy component libraries.

### Authentication: [Clerk](https://clerk.dev/)
Provides industry-standard authentication and user management with minimal configuration, handling session persistence and security out of the box.

### Database: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
A flexible NoSQL database (MongoDB) paired with an elegant object modeling tool (Mongoose) to handle task schemas and persistent storage.

---

## 📂 Folder Structure

```text
/app             # Next.js App Router (pages and layouts)
/components      # Reusable UI components (Shared between client/server)
/lib             # Shared utilities (DB connection, Server Actions)
/models          # Mongoose schemas/models
/public          # Static assets (logos, icons)
/types           # TypeScript interfaces and types
middleware.ts    # Clerk authentication middleware
```

### Server vs. Client Components
- **Server Components**: Used for high-level layouts and pages to handle database fetches directly (e.g., `Sidebar.tsx`, `layout.tsx`).
- **Client Components**: Labeled with `"use client"`, these handle interactivity, state, and browser-side hooks (e.g., `SidebarClient.tsx`, `TaskForm.tsx`).

---

## 🔐 Authentication Flow

Slate utilizes **Clerk** for robust authentication.

1. **Middleware Protection**: The `middleware.ts` file defines public vs. protected routes. By default, task-related routes are protected.
2. **Server-Side Auth**: Server components and actions use `auth()` to retrieve the current `userId` and validate sessions.
3. **Client-Side Auth**: Use `<SignedIn>` and `<SignedOut>` components to conditionally render UI elements based on authentication status.
4. **Redirects**: Users are automatically redirected to the sign-in page if they attempt to access protected resources while logged out.

---

## 🗄️ Database Design

### Task Schema (`models/Task.ts`)
Tasks are stored with the following structure:
- `title`: String (Required)
- `description`: String (Optional)
- `completed`: Boolean (Default: false)
- `userId`: String (Required - links the task to a specific Clerk user)
- `timestamps`: Automatically handles `createdAt` and `updatedAt`.

### Security & Isolation
Every database query is scoped by `userId`. This ensures that even in the database layer, one user cannot access or modify another user's tasks.

---

## 🏛️ UI Architecture

### Shell Layout Pattern
The app uses a persistent shell (`ShellClient.tsx`) consisting of:
- **Navbar**: Floating top-right navigation for authentication controls.
- **Sidebar**: A fixed-width (64px) master list of tasks fetched from the server.
- **Main Content**: A dynamic area that renders the Dashboard or Task Details.

### Master-Detail Navigation
Navigation is handled via URL parameters. Clicking a task in the sidebar updates the URL to `/tasks/[id]`, triggering the `TaskDetail` component to fetch and display the specific task data without a full page reload.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- A MongoDB Atlas account
- A Clerk project

### 1. Clone & Install
```bash
git clone <repository-url>
cd slate-app
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHED_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# MongoDB
MONGODB_URI=mongodb+srv://...
```

### 3. Run Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🚀 Deployment Guide

### Vercel (Recommended)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deployment is automatic on push to the `main` branch.

### MongoDB Atlas
Ensure your database whitelist includes `0.0.0.0/0` or the specific IP addresses provided by your hosting provider.

---

## 🚧 Error Handling
- **Server Failures**: Database connection errors are caught and logged, preventing the entire app from crashing.
- **Unauthorized Access**: Server actions throw errors if a `userId` is not present in the session.
- **Loading States**: Tailwind-based pulse animations provide visual feedback while data is being fetched.

---

## 🔮 Future Improvements
- **Task Search**: Filter tasks by title directly in the sidebar.
- **Task Categories**: Add tags or categories for better organization.
- **Drag & Drop**: Reorder tasks manually.
- **Notifications**: Reminders for pending tasks.

---
*Created with passion for minimalist productivity.*
