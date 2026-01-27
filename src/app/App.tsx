import { RouterProvider } from "react-router";
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "context/auth/AuthProvider";
import StoryProvider from "context/story/StoryProvider";
import { SocketProvider } from "context/socket/SocketProvider";
import { ThemeProvider } from "context/Theme/ThemeProvider";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <SocketProvider>
            <StoryProvider>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster />
              </QueryClientProvider>
            </StoryProvider>
          </SocketProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
