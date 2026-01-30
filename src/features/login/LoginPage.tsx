import loginImage from "@assets/images/login/login.png";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppSelector } from "stores/hooks";

function LoginPage() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 items-center justify-center h-lvh xl:px-50 my-10 mb-20">
      <div className="col-span-1">
        <img
          src={loginImage}
          alt="login page image"
          className="bounce-up-down  drop-shadow-2xl "
        />
      </div>
      <div className="col-span-1 flex flex-col gap-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
