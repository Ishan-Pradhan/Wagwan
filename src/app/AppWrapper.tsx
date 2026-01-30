import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "context/socket/SocketProvider";
import StoryProvider from "context/story/StoryProvider";
import { ThemeProvider } from "context/Theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { useAppDispatch } from "stores/hooks";
import { useEffect } from "react";
import { fetchCurrentUser } from "stores/auth/authThunk";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AppWrapper() {
  const queryClient = new QueryClient();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider>
        <SocketProvider>
          <StoryProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <RouterProvider router={router} />
              <Toaster />
            </QueryClientProvider>
          </StoryProvider>
        </SocketProvider>
      </ThemeProvider>
    </>
  );
}

export default AppWrapper;
