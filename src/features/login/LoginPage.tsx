import loginImage from "@assets/images/login/login.png";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <div className="container grid grid-cols-2 items-center justify-center h-lvh px-50">
      <div className="col-span-1">
        <img src={loginImage} alt="" />
      </div>
      <div className="col-span-1 flex flex-col gap-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
