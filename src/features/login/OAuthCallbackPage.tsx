import { useEffect } from "react";
import { useNavigate } from "react-router";

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Store tokens in cookies
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=none`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=none`;

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirect to feed
      navigate("/", { replace: true });
    } else {
      // If no tokens, redirect to login
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Processing authentication...</p>
    </div>
  );
}

export default OAuthCallbackPage;
