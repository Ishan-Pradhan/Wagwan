import Divider from "@components/ui/Divider";
import Input from "@components/custom-ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@components/custom-ui/Button";
import toast from "react-hot-toast";
import { SignUpSchema, type SignUpFormInput } from "../schema/SignUpSchema";
import { useSignUp } from "../hooks/useSignUp";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";

function SignUpForm() {
  const methods = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      username: "",
      email: "",
      confirmPassword: "",
      password: "",
    },
  });

  const signUpMutation = useSignUp();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(true);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(true);

  const onsubmit = (data: SignUpFormInput) => {
    const { ...payload } = data;

    signUpMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate("/verify-email", {
          replace: true,
          //state can be access by using useLocation in another file
          state: { email: payload.email },
        });
      },
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-xs gap-5 ">
      <h3 className="heading-3-semibold">Sign up to wagwan</h3>
      <div className="flex flex-col gap-4">
        {signUpMutation.isError && (
          <p className="text-red-500 text-sm">
            {signUpMutation.error.message}{" "}
          </p>
        )}

        <FormProvider {...methods}>
          <form
            action=""
            onSubmit={methods.handleSubmit(onsubmit)}
            className="flex flex-col gap-4"
          >
            <Input id="email" name="email" type="text" placeholder="email" />
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
            />
            <div className="relative w-full">
              <Input
                id="password"
                name="password"
                type={togglePassword ? "password" : "text"}
                placeholder="password"
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                {togglePassword ? (
                  <EyeClosedIcon
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="hover:text-gray-500 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="hover:text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="relative w-full">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={toggleConfirmPassword ? "password" : "text"}
                placeholder="confirm password"
              />{" "}
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                {toggleConfirmPassword ? (
                  <EyeClosedIcon
                    onClick={() =>
                      setToggleConfirmPassword(!toggleConfirmPassword)
                    }
                    className="hover:text-gray-500 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() =>
                      setToggleConfirmPassword(!toggleConfirmPassword)
                    }
                    className="hover:text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <Button type="submit" disabled={signUpMutation.isPending}>
              {signUpMutation.isPending ? "Signing up..." : "Sign up"}{" "}
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="items-center h-full">
        <Divider word="OR" />
      </div>

      <div className="flex flex-col gap-5 items-center justify-center">
        <Link
          to="/forgot-password"
          className="body-m-medium hover:text-gray-700"
        >
          Forgot Password?
        </Link>

        <p className="body-m-regular flex gap-1 items-center">
          Have an account?
          <Link
            className="text-primary-900 cursor-pointer hover:text-primary-500"
            to={"/login"}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
