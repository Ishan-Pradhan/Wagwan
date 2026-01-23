import { RouterProvider } from "react-router";
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "context/auth/AuthProvider";
import StoryProvider from "context/story/StoryProvider";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <StoryProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </StoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
