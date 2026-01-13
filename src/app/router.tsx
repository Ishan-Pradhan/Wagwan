import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import FeedPage from "../features/feed/FeedPage";
import LoginPage from "../features/login/LoginPage";
import requireLogin from "./protectedRoutes/requireLogin";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    loader: requireLogin,
    element: <Layout />,
    children: [{ index: true, element: <FeedPage /> }],
  },
]);
