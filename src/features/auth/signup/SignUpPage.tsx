import loginImage from "@assets/images/login/login.png";
import SignUpForm from "./components/SignUpForm";

function SignUpPage() {
  return (
    <div className="container my-10 mb-20 grid h-lvh grid-cols-1 items-center justify-center md:grid-cols-2 lg:my-0 lg:mb-0 xl:px-50">
      <div className="col-span-1">
        <img
          src={loginImage}
          alt="sign page image"
          className="bounce-up-down drop-shadow-2xl"
        />
      </div>
      <div className="col-span-1 flex flex-col gap-10">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
