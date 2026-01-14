import Button from "@components/ui/Button";
import { EnvelopeIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";

function VerifyEmailPage() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="container flex items-center justify-center h-lvh">
      <div className="flex flex-col gap-4 relative border-2 border-gray-300 rounded-xl bg-white p-10 max-w-xl">
        <div className="absolute rounded-full p-2 flex items-center justify-center -top-5 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300">
          <EnvelopeIcon size={24} />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="body-m-regular text-gray-600">
            We’ve sent a verification email to
          </p>
          <span className="body-l-semibold">{email}</span>
          <p className="body-m-regular text-gray-600 text-center">
            Please open the email and click the verification link to complete
            the signup process. If you don’t see the email within a few minutes,
            check your spam or junk folder.
          </p>
        </div>

        <Link to="/login">
          <Button type="button">Go to Login </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
