const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  required,
  helperText,
}) => (
  <div className="form-group flex flex-col gap-2 mb-4">
    <label className="font-medium text-[.9rem]" htmlFor={id}>
      {label} {required && "*"}
    </label>
    <input
      className="border border-gray-300 h-10 px-3 focus:outline-none text-[1rem]"
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
    />
    {helperText && (
      <p className="text-gray-500 font-thin text-xs">{helperText}</p>
    )}
  </div>
);

export default InputField;
