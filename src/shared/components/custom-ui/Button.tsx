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
      className={`bg-primary-500 hover:bg-primary-600 cursor-pointer rounded-md px-3 py-2 text-white transition-all duration-100 ease-in ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
