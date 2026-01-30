import { useState } from "react";
import { changePassword } from "./api/changePassword";
import toast from "react-hot-toast";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  type ChangePasswordFormInput,
} from "./schema/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/custom-ui/Input";
import Spinner from "@components/custom-ui/Spinner";
import axios from "axios";

function ChangePassword() {
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const methods = useForm<ChangePasswordFormInput>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: ChangePasswordFormInput) => {
    try {
      const { oldPassword, newPassword } = data;

      const res = await changePassword(oldPassword, newPassword);

      if (res?.data.success) {
        toast.success(res?.data.message);
        methods.reset();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err;

        if (error.response?.data) {
          toast.error(error.response?.data?.message ?? "Something went wrong");
          throw error.response.data;
        }
      }
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <div className="container flex flex-col gap-6 py-10">
      <h3 className="body-l-medium">Change Password</h3>

      <FormProvider {...methods}>
        <form
          action=""
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col gap-4"
        >
          <div className="relative w-full">
            <Input
              type={seeOldPassword ? "text" : "password"}
              placeholder="Current Password"
              id="oldPassword"
              name="oldPassword"
            />

            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl dark:text-black">
              {seeOldPassword ? (
                <EyeIcon onClick={() => setSeeOldPassword(!seeOldPassword)} />
              ) : (
                <EyeClosedIcon
                  onClick={() => setSeeOldPassword(!seeOldPassword)}
                />
              )}
            </div>
          </div>
          <div className="relative w-full">
            <Input
              type={seeNewPassword ? "text" : "password"}
              placeholder="New Password"
              id="newPassword"
              name="newPassword"
            />

            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl dark:text-black">
              {seeNewPassword ? (
                <EyeIcon onClick={() => setSeeNewPassword(!seeNewPassword)} />
              ) : (
                <EyeClosedIcon
                  onClick={() => setSeeNewPassword(!seeNewPassword)}
                />
              )}
            </div>
          </div>
          <div className="relative w-full">
            <Input
              type={seeConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
            />

            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl dark:text-black">
              {seeConfirmPassword ? (
                <EyeIcon
                  onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                />
              ) : (
                <EyeClosedIcon
                  onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                />
              )}
            </div>
          </div>

          <button
            className="bg-primary-500 hover:bg-primary-600 body-m-regular cursor-pointer self-end rounded-md px-10 py-3 text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2">
                <span className="">Changing Password</span>
                <Spinner />
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default ChangePassword;
