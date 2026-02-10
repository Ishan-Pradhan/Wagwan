import { LockKeyIcon } from "@phosphor-icons/react";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Divider from "@components/ui/Divider";
import { Link, useNavigate, useParams } from "react-router";
function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    navigate("/forgot-password");
    return null;
  }
  return (
    <div className="container mt-10 flex h-[90vh] w-lg flex-col items-center justify-center gap-6">
      <LockKeyIcon size={42} weight="duotone" />
      <div className="flex flex-col items-center gap-2">
        <h3 className="heading-3-medium">Trouble logging in?</h3>
        <p className="text-center text-gray-500">
          Enter your email and we'll send you a link to get back into your
          account
        </p>
      </div>
      <div className="w-full">
        <ResetPasswordForm token={token} />
      </div>

      <div className="w-full items-center">
        <Divider word="OR" />
      </div>
      <Link to="/signup" className="body-l-semibold">
        Create New Account
      </Link>

      <Link
        to="/login"
        className="body-l-regular flex w-full justify-center bg-gray-700 py-3 text-white transition-all duration-100 hover:underline"
      >
        Go Back to Login
      </Link>
    </div>
  );
}

export default ResetPasswordPage;
