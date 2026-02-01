import { changePassword } from "./api/changePassword";
import toast from "react-hot-toast";
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
    <div className="flex max-w-2xl flex-col gap-6 px-20 py-10">
      <h3 className="body-l-medium">Change Password</h3>

      <FormProvider {...methods}>
        <form
          action=""
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col gap-4"
        >
          <Input
            type="password"
            placeholder="Current Password"
            id="oldPassword"
            name="oldPassword"
          />

          <Input
            type="password"
            placeholder="New Password"
            id="newPassword"
            name="newPassword"
          />

          <Input
            type="password"
            placeholder="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
          />

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
