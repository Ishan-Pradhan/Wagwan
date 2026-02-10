import Button from "@components/custom-ui/Button";
import { SealCheckIcon, SpinnerIcon, XCircleIcon } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";

function VerificationResultPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");

  // ref to track if the request was already sent
  //cause we if user reloads the page the token becomes expired
  const initialized = useRef(false);

  useEffect(() => {
    // proceed if we haven't started a request yet
    if (!initialized.current && token) {
      initialized.current = true; // Mark as started

      const verifyEmail = async () => {
        const res = await axios.get(`/api/v1/users/verify-email/${token}`);
        if (res.data.success) {
          setStatus("success");
        }

        if (!res.data.success) {
          if (axios.isAxiosError(error)) {
            setStatus((prev) => (prev === "success" ? "success" : "error"));
            setError(error?.response?.data.message || "Verification failed");
          }
        }
      };

      verifyEmail();
    }
  }, [token, error]);

  return (
    <div className="container flex h-lvh items-center justify-center">
      <div className="relative flex max-w-xl flex-col gap-4 rounded-xl border-2 border-gray-300 bg-white p-10 lg:p-10">
        <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-2 border-gray-300 bg-white p-2">
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
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="body-m-bold dark:text-gray-800">You’re all set!</p>
            <p className="body-m-regular text-center text-gray-600">
              Congratulations! Your email verification is complete. Please
              proceed to the login page to access your account.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="body-m-bold">Verification failed!</p>
            <p>{error}</p>
          </div>
        )}

        <Link to="/login">
          <Button type="button" className="w-full">
            Go to Login{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerificationResultPage;
