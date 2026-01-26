import Button from "@components/custom-ui/Button";
import SimpleInput from "@components/ui/SimpleInput";
import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import toast from "react-hot-toast";
import Spinner from "@components/ui/Spinner";
import Confirmation from "@components/widgets/Confirmation";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        setMessage(data.message);
        setSuccess(true);
        setEmail("");
      },
      onError: (error) => {
        toast.error(error.message);
        setSuccess(false);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
      {success && <Confirmation isSuccess={true} message={message} />}

      <div className="flex flex-col gap-3 w-full">
        <SimpleInput
          name="forgot-password"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button type="submit">
          {forgotPasswordMutation.isPending ? (
            <div className="flex gap-2 items-center justify-center">
              <span>Sending Please wait</span> <Spinner />
            </div>
          ) : (
            "Send Link"
          )}
        </Button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
