import Button from "@components/custom-ui/Button";
import SimpleInput from "@components/ui/SimpleInput";
import { useState } from "react";
import Spinner from "@components/custom-ui/Spinner";
import Confirmation from "@components/widgets/Confirmation";
import { forgotPassword } from "../api/forgot-password";
import { useMutation } from "@tanstack/react-query";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  //forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        setMessage(data.message);
        setSuccess(true);
        setEmail("");
      },
      onError: () => {
        setSuccess(false);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      {success && <Confirmation isSuccess={true} message={message} />}

      <div className="flex w-full flex-col gap-3">
        <SimpleInput
          name="forgot-password"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button type="submit">
          {forgotPasswordMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
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
