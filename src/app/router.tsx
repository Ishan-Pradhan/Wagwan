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
import StoryPage from "features/story/StoryPage";
import MessagePage from "features/message/MessagePage";
import ChangePassword from "features/user/change-password/ChangePassword";
import RouteError from "features/error/RouteError";
import ErrorBoundary from "./ErrorBoundary";
import FeedsFallback from "features/error/FeedsFallback";
import MessageFallback from "features/error/MessageFallback";
import UserProfileFallback from "features/error/UserProfileFallback";
import LottieLoading from "@components/custom-ui/LottieLoading";
import isVerified from "./protectedRoutes/isVerified";

export const router = createBrowserRouter([
  {
    path: "/login",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <LoginPage />,
  },
  {
    path: "/signup",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <ForgotPasswordPage />,
  },
  {
    path: "/forgot-password/:token",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <ResetPasswordPage />,
  },
  {
    path: "/verify-email",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <VerifyEmailPage />,
  },
  {
    path: "/users/verify-email/:token",
    element: <VerificationResultPage />,
  },
  {
    path: "*",
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <NotFound />,
  },
  {
    path: "/",
    loader: requireLogin,
    errorElement: <RouteError />,
    hydrateFallbackElement: (
      <div className="h-lvh">
        <LottieLoading />
      </div>
    ),
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary fallback={<FeedsFallback />}>
            <FeedPage />
          </ErrorBoundary>
        ),
      },
      { path: "post/:postId", element: <SinglePostPage /> },
      { path: "posts/tags/:tag", element: <TagsPage /> },
      { path: "story/:username", element: <StoryPage /> },
      {
        path: "message",
        loader: isVerified,
        element: (
          <ErrorBoundary
            fallback={
              <MessageFallback onRetry={() => window.location.reload()} />
            }
          >
            <MessagePage />{" "}
          </ErrorBoundary>
        ),
      },
      {
        path: "user",
        element: <Outlet />,
        children: [
          { element: <NotFound />, index: true },
          {
            element: (
              <ErrorBoundary
                fallback={
                  <UserProfileFallback
                    onRetry={() => window.location.reload()}
                  />
                }
              >
                <UserProfile />
              </ErrorBoundary>
            ),
            path: "profile/:username",
          },
          { element: <EditProfile />, path: "profile/edit-profile" },
          { element: <ChangePassword />, path: "profile/change-password" },
        ],
      },
    ],
  },
]);
