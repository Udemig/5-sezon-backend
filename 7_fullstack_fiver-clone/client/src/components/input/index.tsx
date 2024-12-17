type Props = {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number" | "file" | "textarea";
  min?: number;
  max?: number;
  placeholder?: string;
  isMulti?: boolean;
};

const Input = ({
  label,
  name,
  placeholder,
  disabled = false,
  type = "text",
  required = false,
  max,
  min,
  isMulti,
}: Props) => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900" htmlFor={name}>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          required
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className="input-field min-h-[100px] max-h-[250px]"
        />
      ) : (
        <input
          id={name}
          min={min}
          max={max}
          name={name}
          type={type}
          multiple={isMulti}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="input-field"
        />
      )}
    </div>
  );
};

export default Input;
