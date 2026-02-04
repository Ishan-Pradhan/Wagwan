import {
  ArrowCounterClockwiseIcon,
  SealWarningIcon,
} from "@phosphor-icons/react";
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
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <SealWarningIcon size={70} weight="duotone" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(0)}
          className="bg-primary-500 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1"
        >
          <span>Retry</span>
          <ArrowCounterClockwiseIcon />
        </button>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
