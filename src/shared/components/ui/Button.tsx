import type { ButtonPropTypes } from "types/ui/ButtonPropTypes";

function Button({
  type,
  disabled,
  children,
  className,
  onClick,
}: ButtonPropTypes) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary-500 text-white rounded-md py-2 px-3 cursor-pointer  hover:bg-primary-600 transition-all duration-100 ease-in w-full ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
