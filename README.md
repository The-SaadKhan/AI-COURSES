# 🧠 AI Courses – An AI-Powered Course Generation Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?logo=vercel&logoColor=white)](https://ai-courses-alpha.vercel.app/)

**AI Courses** is a modern, full-stack web application built with Next.js 14 that leverages the power of Google's Gemini AI to automatically generate complete, structured educational courses from a single prompt. It also creates custom course banners on the fly using AI Guru Lab.

> This project showcases a real-world application of generative AI, modern authentication, serverless databases, and type-safe ORMs in a full-stack Next.js environment.

---

## ✨ Badges

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black)
![Vercel](https://img.shields.io/badge/Hosted-Vercel-black?logo=vercel&logoColor=white)

---

## 🚀 Features

-   🔐 **Secure Authentication**: Clerk for user management, sign-in, sign-up, and protected routes.
-   🤖 **AI-Powered Course Generation**: Utilizes Google Gemini to create detailed course structures, chapters, and content from a user's prompt.
-   🎨 **AI-Generated Banners**: Integrates with AI Guru Lab to automatically create visually appealing course banners.
-   📚 **Dynamic Chapter Creation**: Generates individual chapters with AI-curated YouTube video suggestions to supplement learning.
-   💾 **Robust Database**: Uses Neon's serverless PostgreSQL with Drizzle ORM for type-safe, efficient database queries.
-   ✨ **Modern UI/UX**: Built with Tailwind CSS and ShadCN UI for a clean, responsive, and accessible interface.
-   🌐 **Serverless Deployment**: Seamlessly deployed on Vercel, leveraging the best of serverless architecture.

---

## 🧰 Tech Stack

| Frontend                     | Backend (Next.js API Routes) | AI & Database                  |
| ---------------------------- | ---------------------------- | ------------------------------ |
| Next.js 14 + React           | Next.js 14 Server Actions    | Neon (Serverless PostgreSQL)   |
| TypeScript                   | Clerk (Auth & Middleware)    | Drizzle ORM                    |
| Tailwind CSS + ShadCN UI     | Zod (Validation)             | Google Gemini API              |
| Context API + Axios          |                              | AI Guru Lab API                |

---

## 🔐 Environment Variables

To run this project locally, you need to set up the following environment variables. Create a `.env.local` file in the root directory and add the following:

```bash
# Neon PostgreSQL Database URL
DATABASE_URL="your-neon-database-connection-string"

# Clerk Authentication Keys
# Find these in your Clerk Dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Google Gemini API Key
# Get this from Google AI Studio
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"

# AI Guru Lab API Key (Optional, for image generation)
AIGURULAB_API_KEY="your-aigurulab-api-key"
```

## 🚀 Production Deployment
| Layer                      | Platform        | 
|------------------------------|---------------|
| Front-End                  | Vercel          |          
| Back-End                   | Render          |  
| DataBase                   | MongoDb Altas   |          





### 🧠 Key Learnings:

- Full-stack development with the Next.js 14 App Router.

- Integrating and managing user authentication and middleware with Clerk.

- Type-safe database modeling and querying with Drizzle ORM against a serverless PostgreSQL database (Neon).

- Prompt engineering and streaming responses from a generative AI model (Google Gemini).

- Handling server actions and API routes in a modern Next.js environment.

- Building modern, component-based UIs with ShadCN and Tailwind CSS.

- Automating deployment pipelines for a full-stack application using Vercel.

## 🌐 Live Demo



🚀 Check out the deployed project here: [AI-Courses](https://productivity-os.vercel.app/)



---

