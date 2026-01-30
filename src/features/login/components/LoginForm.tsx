import Divider from "@components/ui/Divider";
import Input from "@components/custom-ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginSchema, type LoginFormInput } from "../schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import Button from "@components/custom-ui/Button";
import toast from "react-hot-toast";
import googleLogo from "@assets/images/googleLogo.svg";
import { useAppDispatch } from "stores/hooks";
import { setUser } from "stores/auth/authSlice";

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
        toast.success(data.message);

        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/", { replace: true });
      },
    });
  };

  const handleGooglebutton = () => {
    window.location.href = "http://localhost:8080/api/v1/users/google";
    // navigate("http://localhost:8080/api/v1/users/google");
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

      <button
        type="button"
        className="flex gap-3 justify-center items-center bg-white py-3 shadow-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-200 cursor-pointer transition-all duration-150 ease-in-out"
        onClick={handleGooglebutton}
      >
        <img src={googleLogo} alt="google logo" />
        <span className="body-m-medium dark:text-gray-800">
          Sign in with Google
        </span>
      </button>

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
