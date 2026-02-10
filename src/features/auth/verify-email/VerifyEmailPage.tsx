import Button from "@components/custom-ui/Button";
import { EnvelopeIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";

function VerifyEmailPage() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="container flex h-lvh items-center justify-center">
      <div className="relative flex max-w-xl flex-col gap-4 rounded-xl border-2 border-gray-300 bg-white p-10">
        <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-2 border-gray-300 bg-white p-2">
          <EnvelopeIcon size={24} className="dark:text-gray-700" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="body-m-regular text-gray-600">
            We’ve sent a verification email to
          </p>
          <span className="body-l-semibold text-gray-900 dark:text-gray-700">
            {email}
          </span>
          <p className="body-s-regular text-center text-gray-600">
            Please open the email and click the verification link to complete
            the signup process. If you don’t see the email within a few minutes,
            check your spam or junk folder.
          </p>
        </div>

        <Link to="/login">
          <Button type="button" className="w-full">
            Go to Login{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
