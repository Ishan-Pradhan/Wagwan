import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        title = "Unauthorized";
        message = "Please log in to continue.";
        break;

      case 403:
        title = "Forbidden";
        message = "You don’t have permission to view this page.";
        break;

      case 404:
        title = "Not Found";
        message = "The requested resource does not exist.";
        break;

      default:
        title = `${error.status} Error`;
        message = error.statusText || message;
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{message}</p>

      <div className="flex gap-2">
        <button onClick={() => navigate(0)}>Retry</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
}
