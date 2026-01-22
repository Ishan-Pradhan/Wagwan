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
import VerifyEmailPage from "features/verify-email/VerifyEmailPage";
import VerificationResultPage from "features/verification-result/VerificationResultPage";
import SinglePostPage from "features/single-post/SinglePostPage";
import TagsPage from "features/tags/TagsPage";
import EditProfile from "features/user/edit-profile/EditProfile";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/forgot-password/:token", element: <ResetPasswordPage /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
  {
    path: "/users/verify-email/:token",
    element: <VerificationResultPage />,
  },
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    loader: requireLogin,
    element: <Layout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: "post/:postId", element: <SinglePostPage /> },
      { path: "posts/tags/:tag", element: <TagsPage /> },
      {
        path: "user",
        element: <Outlet />,
        children: [
          { element: <NotFound />, index: true },
          { element: <UserProfile />, path: "profile/:username" },
          { element: <EditProfile />, path: "profile/edit-profile" },
        ],
      },
    ],
  },
]);
