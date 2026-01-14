import Button from "@components/ui/Button";
import { SealCheckIcon, SpinnerIcon, XCircleIcon } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";

function VerificationResultPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");

  // ref to track if the request was already sent
  const initialized = useRef(false);

  useEffect(() => {
    // proceed if we haven't started a request yet
    if (!initialized.current && token) {
      initialized.current = true; // Mark as started

      const verifyEmail = async () => {
        try {
          const res = await axios.get(`/api/v1/users/verify-email/${token}`);
          if (res.data.success) {
            setStatus("success");
          }
        } catch (error) {
          // set error if we aren't already successful
          setStatus((prev) => (prev === "success" ? "success" : "error"));

          if (axios.isAxiosError(error)) {
            setError(error?.response?.data.message || "Verification failed");
          }
        }
      };

      verifyEmail();
    }
  }, [token]);

  return (
    <div className="container flex items-center justify-center h-lvh">
      <div className="flex flex-col gap-4 relative border-2 border-gray-300 rounded-xl bg-white lg:p-10 p-10 max-w-xl">
        <div className="absolute rounded-full p-2 flex items-center justify-center -top-5 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300">
          {status === "success" ? (
            <SealCheckIcon weight="duotone" fill="green" size={32} />
          ) : status === "error" ? (
            <XCircleIcon weight="duotone" fill="red" size={32} />
          ) : status === "loading" ? (
            <SpinnerIcon weight="duotone" fill="yellow" size={32} />
          ) : (
            ""
          )}
        </div>

        {status === "success" && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="body-m-bold">You’re all set!</p>
            <p className="body-m-regular text-gray-600 text-center">
              Congratulations! Your email verification is complete. Please
              proceed to the login page to access your account.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="body-m-bold">Verification failed!</p>
            <p>{error}</p>
          </div>
        )}

        <Link to="/login">
          <Button type="button">Go to Login </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerificationResultPage;
