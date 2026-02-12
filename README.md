# Wagwan - Modern Social Media Platform

![Wagwan Banner](https://img.shields.io/badge/Wagwan-Social--Media-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind--CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)

Wagwan is a full-featured, Instagram-inspired social media application built with a modern React stack. It offers a seamless user experience with real-time features, secure authentication, and a responsive design.

---

## 🚀 Key Features

- **🔐 Secure Authentication**: Full auth flow including Login, Signup, Forgot Password, and Email Verification.
- **📸 Dynamic Feed**: Explore posts, like, comment, and see real-time updates.
- **💬 Real-time Messaging**: Chat with friends using Socket.io for instant communication.
- **👤 User Profiles**: Customizable profiles with follow/unfollow functionality, profile editing, and password management.
- **🔍 Advanced Search**: Find and explore content with tags.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### State & Data Management

- **Global State**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **API Client**: [Axios](https://axios-http.com/) with interceptors for token management.

### Styling & UI

- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Base UI](https://base-ui.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/), [Lucide React](https://lucide.dev/)
- **Animations**: [Lottie React](https://github.com/LottieFiles/lottie-react), [Swiper](https://swiperjs.com/), [Splide](https://splidejs.com/)

### Communication & Forms

- **Real-time**: [Socket.io Client](https://socket.io/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation.

---

## ⚙️ Backend API

This project consumes **[FreeAPI (APIHub)](https://github.com/hiteshchoudhary/apihub)** by [Hitesh Choudhary](https://github.com/hiteshchoudhary). It provides a robust collection of common APIs for building full-stack applications.

---

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ishan-Pradhan/Social-Media.git
   cd Social-Media
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_SERVER_URL=your_api_endpoint_URL
   VITE_SOCKET_URL=your_socket_server_URL
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── api/          # Axios instance and API definitions
├── app/          # Global providers, router, and layout
├── assets/       # Static assets (images, fonts, lotties)
├── constants/    # Global constants and enums
├── context/      # React Contexts
├── features/     # Feature-based modules (auth, feed, chat, user)
├── hooks/        # Custom React hooks
├── lib/          # Third-party library configurations
├── shared/       # Reusable components and utilities
├── stores/       # Redux slices and thunks
├── types/        # TypeScript type definitions
└── utils/        # Helper functions
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
