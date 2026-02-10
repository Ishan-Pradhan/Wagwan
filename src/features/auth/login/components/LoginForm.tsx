import Divider from "@components/ui/Divider";
import Input from "@components/custom-ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginSchema, type LoginFormInput } from "../schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@components/custom-ui/Button";
import toast from "react-hot-toast";
import googleLogo from "@assets/images/googleLogo.svg";
import { useAppDispatch } from "stores/hooks";
import { setUser } from "stores/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";

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

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
        dispatch(setUser(data.data.user));
        toast(`Welcome back ${data.data.user.username}`, {
          icon: "👋",
        });

        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/", { replace: true });
      },
    });
  };

  const handleGoogleButton = () => {
    window.location.href = "http://localhost:8080/api/v1/users/google";
  };

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-5">
      <h3 className="heading-3-semibold">Log into wagwan</h3>
      <div className="flex flex-col gap-4">
        {loginMutation.isError && (
          <p className="text-sm text-red-500">{loginMutation.error.message} </p>
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
      <div className="h-full items-center">
        <Divider word="OR" />
      </div>

      <button
        type="button"
        className="flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-white py-3 shadow-sm transition-all duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-200"
        onClick={handleGoogleButton}
      >
        <img src={googleLogo} alt="google logo" />
        <span className="body-m-medium dark:text-gray-800">
          Sign in with Google
        </span>
      </button>

      <div className="flex flex-col items-center justify-center gap-5">
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
