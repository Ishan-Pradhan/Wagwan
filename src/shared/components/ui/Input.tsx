import { useFormContext, useFormState, useWatch } from "react-hook-form";
import type { InputPropTypes } from "types/ui/inputPropTypes";

function Input({
  className,
  type = "text",
  placeholder,
  name,
}: InputPropTypes) {
  const { register, control, setValue } = useFormContext();

  const { errors } = useFormState({ control, name });
  const error = errors[name]?.message as string | undefined;

  const value = (useWatch({ control, name, defaultValue: "" }) as string) || "";

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        {...register(name)}
        className={`border w-full border-gray-200 bg-gray-50 rounded-sm px-3 py-2 placeholder:text-sm hover:bg-gray-100 hover:border-gray-300 transition-all duration-100 ease-in ${className}`}
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(name, e.target.value)}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default Input;
