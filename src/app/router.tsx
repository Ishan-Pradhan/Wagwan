import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import FeedPage from "../features/feed/FeedPage";
import LoginPage from "../features/login/LoginPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <FeedPage /> }],
  },
]);
