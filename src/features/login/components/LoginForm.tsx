import Divider from "@components/ui/Divider";
import Input from "@components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginSchema, type LoginFormInput } from "../schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import Button from "@components/ui/Button";
import { useAuth } from "context/auth/AuthContext";
import toast from "react-hot-toast";

function LoginForm() {
  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onsubmit = (data: LoginFormInput) => {
    const { usernameOrEmail, password } = data;

    const payload: { username?: string; email?: string; password: string } = {
      password,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (usernameOrEmail)
      if (emailRegex.test(usernameOrEmail)) {
        payload.email = usernameOrEmail.toLowerCase();
      } else {
        payload.username = usernameOrEmail.toLowerCase();
      }

    //mutate payload , if email then payload goes as email and if username then payload goes as username
    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        setUser(data);
        toast.success(data.message);

        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-xs gap-5 ">
      <h3 className="heading-3-semibold">Log into wagwan</h3>
      <div className="flex flex-col gap-4">
        {loginMutation.isError && (
          <p className="text-red-500 text-sm">{loginMutation.error.message} </p>
        )}

        <FormProvider {...methods}>
          <form
            action=""
            onSubmit={methods.handleSubmit(onsubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              placeholder="username or email"
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}{" "}
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

        <p className="body-m-regular">
          Don't have an Account?{" "}
          <Link className="text-primary-900 cursor-pointer" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
