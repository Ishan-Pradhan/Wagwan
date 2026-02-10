import Divider from "@components/ui/Divider";
import Input from "@components/custom-ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@components/custom-ui/Button";
import toast from "react-hot-toast";
import { SignUpSchema, type SignUpFormInput } from "../schema/SignUpSchema";
import { useSignUp } from "../hooks/useSignUp";

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
    <div className="mx-auto flex w-full max-w-xs flex-col gap-5">
      <h3 className="heading-3-semibold">Sign up to wagwan</h3>
      <div className="flex flex-col gap-4">
        {signUpMutation.isError && (
          <p className="text-sm text-red-500">
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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
            />
            <Button type="submit" disabled={signUpMutation.isPending}>
              {signUpMutation.isPending ? "Signing up..." : "Sign up"}{" "}
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="h-full items-center">
        <Divider word="OR" />
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <Link
          to="/forgot-password"
          className="body-m-medium hover:text-gray-700"
        >
          Forgot Password?
        </Link>

        <p className="body-m-regular flex items-center gap-1">
          Have an account?
          <Link
            className="text-primary-900 hover:text-primary-500 cursor-pointer"
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
