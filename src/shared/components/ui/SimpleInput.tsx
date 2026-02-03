import type { SimpleInputPropTypes } from "types/ui/SimpleInputPropTypes";

function SimpleInput({
  value,
  onChange,
  name,
  placeholder,
  type,
}: SimpleInputPropTypes) {
  return (
    <div className="relative flex w-full flex-col gap-2">
      <input
        type={type}
        id={name}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
        className={`peer focus-within:outline-primary-500 w-full rounded-sm border px-3 py-2 transition-all duration-100 ease-in focus-within:outline hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute top-3.5 left-2.5 text-sm text-gray-500 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
      >
        {placeholder}
      </label>
    </div>
  );
}

export default SimpleInput;
