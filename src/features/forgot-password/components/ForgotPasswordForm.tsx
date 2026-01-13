import Button from "@components/ui/Button";
import SimpleInput from "@components/ui/SimpleInput";
import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import toast from "react-hot-toast";
import Spinner from "@components/ui/Spinner";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
    </form>
  );
}

export default ForgotPasswordForm;
