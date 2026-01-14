import type { ButtonPropTypes } from "types/ui/ButtonPropTypes";

function Button({ type, disabled, children, onClick }: ButtonPropTypes) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-primary-500 text-white rounded-md py-2 cursor-pointer w-full hover:bg-primary-600 transition-all duration-100 ease-in"
    >
      {children}
    </button>
  );
}

export default Button;
