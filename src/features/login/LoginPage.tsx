import loginImage from "@assets/images/login/login.png";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 items-center justify-center h-lvh xl:px-50 my-10">
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
