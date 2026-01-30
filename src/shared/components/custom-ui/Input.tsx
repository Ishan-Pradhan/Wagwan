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
    <div className="relative flex w-full flex-col gap-2">
      <input
        {...register(name)}
        className={`peer focus-within:outline-primary-500 w-full rounded-sm border px-3 py-3 transition-all duration-100 ease-in focus-within:outline hover:border-gray-300 hover:bg-gray-100 dark:text-gray-900 ${className} ${
          error ? "border-red-500 bg-red-100" : "border-gray-200 bg-gray-50"
        }`}
        type={type}
        id={name}
        placeholder=" "
        name={name}
        value={value}
        onChange={(e) => setValue(name, e.target.value)}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute top-3.5 left-2.5 text-sm text-gray-500 peer-not-placeholder-shown:top-0.5 peer-not-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0.5 peer-focus:text-xs"
      >
        {placeholder}
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
