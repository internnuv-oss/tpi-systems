# TPI Systems (TheProcessInsights)

TheProcessInsights (TPI) builds Causal Intelligence systems that reveal why industrial systems behave the way they do — and how to optimize them with scientific certainty. We transform operational data from a passive record into an active control system.

## 🚀 Tech Stack

This project is a modern single-page application built with:
- **Frontend Framework:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Data Fetching:** React Query (@tanstack/react-query)
- **Routing:** React Router v6
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)

## 📂 Project Structure

- `src/components/sections/`: Contains the modular sections for the public landing page (Home, Platform, Solutions, Resources, About, Careers).
- `src/components/admin/`: Contains the CMS dashboard components for managing Resources and Job postings.
- `src/pages/`: Contains the top-level route views (`Index.tsx`, `AdminLogin.tsx`, `AdminDashboard.tsx`, etc.).
- `src/integrations/supabase/`: Contains the Supabase client setup and TypeScript definitions generated from the database schema.
- `supabase/migrations/`: Contains the SQL scripts required to reconstruct the database schema and Row Level Security (RLS) policies.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_anon_public_key"
```

### 3. Run the Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:8080`.

## 📦 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `VITE_SUPABASE_*` environment variables in the Vercel project settings.
4. Deploy!

## 🔐 Admin Access

To access the CMS dashboard, navigate to `/admin-login`. You must have an account registered in your Supabase authentication instance, and that user's ID must be mapped to the `admin` role in the `user_roles` database table.

---
*© 2026 TPI Systems. All rights reserved.*