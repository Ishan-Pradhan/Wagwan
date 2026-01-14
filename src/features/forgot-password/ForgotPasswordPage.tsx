import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { LockKeyIcon } from "@phosphor-icons/react";
import Divider from "@components/ui/Divider";
import { Link } from "react-router";
function ForgotPasswordPage() {
  return (
    <div className="container mt-10 flex flex-col gap-6 justify-center items-center  h-[90vh] w-lg">
      <LockKeyIcon size={42} weight="duotone" />
      <div className="flex flex-col items-center gap-2">
        <h3 className="heading-3-medium">Trouble logging in?</h3>
        <p className="text-gray-500 text-center">
          Enter your email and we'll send you a link to get back into your
          account
        </p>
      </div>
      <div className="w-full">
        <ForgotPasswordForm />
      </div>

      <div className="items-center w-full">
        <Divider word="OR" />
      </div>
      <Link to="/signup" className="body-l-semibold">
        Create New Account
      </Link>

      <Link
        to="/login"
        className="bg-gray-700 py-3 w-full flex justify-center text-white hover:underline transition-all duration-100 body-l-regular"
      >
        Go Back to Login
      </Link>
    </div>
  );
}

export default ForgotPasswordPage;
