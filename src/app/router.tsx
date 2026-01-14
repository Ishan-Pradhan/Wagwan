import { createBrowserRouter, Outlet } from "react-router";
import Layout from "./Layout";
import FeedPage from "../features/feed/FeedPage";
import LoginPage from "../features/login/LoginPage";
import requireLogin from "./protectedRoutes/requireLogin";
import ForgotPasswordPage from "features/forgot-password/ForgotPasswordPage";
import SignUpPage from "features/signup/SignUpPage";
import UserProfile from "features/user/profile/UserProfile";
import ResetPasswordPage from "features/reset-password/ResetPasswordPage";
import NotFound from "features/error/NotFound";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/forgot-password/:token", element: <ResetPasswordPage /> },
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    loader: requireLogin,
    element: <Layout />,
    children: [
      { index: true, element: <FeedPage /> },
      {
        path: "user",
        element: <Outlet />,
        children: [
          { element: <NotFound />, index: true },
          { element: <UserProfile />, path: "profile" },
        ],
      },
    ],
  },
]);
