import { useNavigate } from "react-router";

import ErrorImage from "@assets/images/error/notfound.png";
import Button from "@components/ui/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container grid h-lvh grid-cols-2 items-center gap-16 px-40">
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col">
          <span className="display-1 text-gray-100">Error 404</span>
          <p className="heading-1">Oops! page not found</p>
        </div>
        <p className="body-xxl-400 text-gray-700">
          Something went wrong. It’s look that your requested could not be
          found. It's look like the link is broken or the page is removed.
        </p>

        <Button type="button" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
      <div className="flex h-full items-center">
        <img src={ErrorImage} alt="Error image" />
      </div>
    </div>
  );
}

export default NotFound;
