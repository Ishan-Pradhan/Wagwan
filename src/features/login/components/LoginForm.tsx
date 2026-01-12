import Divider from "@components/ui/Divider";
import Input from "@components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";
import { LoginSchema, type LoginFormInput } from "../schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onsubmit = (data: LoginFormInput) => {
    console.log("hellos");
    loginMutation.mutate(data, {
      onSuccess: () => {
        console.log("yes logged in");
      },
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-xs gap-3 ">
      <h3 className="heading-3-medium">Log into wagwan</h3>

      <FormProvider {...methods}>
        <form
          action=""
          onSubmit={methods.handleSubmit(onsubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="username or email"
            className=""
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className=""
          />

          <button
            type="submit"
            className="bg-primary-500 text-white rounded-md py-2 cursor-pointer w-full "
          >
            Login
          </button>
        </form>
      </FormProvider>
      <Divider />

      <p>
        Don't have an Account?{" "}
        <Link className="text-primary-900 cursor-pointer" to={"/signup"}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
