import type { SimpleInputPropTypes } from "types/ui/SimpleInputPropTypes";

function SimpleInput({
  value,
  onChange,
  name,
  placeholder,
  type,
}: SimpleInputPropTypes) {
  return (
    <div className="w-full flex flex-col gap-2 relative ">
      <input
        type={type}
        id={name}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
        className={`peer border w-full   rounded-sm px-3 py-2 focus-within:outline focus-within:outline-primary-500   hover:bg-gray-100 hover:border-gray-300 transition-all duration-100 ease-in 
`}
      />
      <label
        htmlFor={name}
        className="absolute text-sm top-3.5 left-2.5 
      peer-placeholder-shown:top-2.5
      peer-placeholder-shown:text-sm
      peer-focus:top-0
      peer-focus:text-xs
      pointer-events-none
    text-gray-500
      peer-not-placeholder-shown:top-0
      peer-not-placeholder-shown:text-xs"
      >
        {placeholder}
      </label>
    </div>
  );
}

export default SimpleInput;
