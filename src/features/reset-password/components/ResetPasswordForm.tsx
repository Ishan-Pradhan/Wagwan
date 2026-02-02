import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import Button from "@components/custom-ui/Button";
import SimpleInput from "@components/ui/SimpleInput";
import Spinner from "@components/custom-ui/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { ResetPasswordProps } from "../types/ResetPasswordTypes";

function ResetPasswordForm({ token }: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState("");

  const resetPasswordMutation = useResetPassword();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resetPasswordMutation.mutate(
      { token, newPassword },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/login", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <SimpleInput
        name="new-password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
      />
      <Button type="submit" disabled={resetPasswordMutation.isPending}>
        {resetPasswordMutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <span>Changing password</span> <Spinner />
          </div>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
