interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  icon?: JSX.Element;
  placeholder: string;
  type?: string;
  customRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  restProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput = ({
  id,
  name,
  label,
  icon,
  value,
  customRef,
  error,
  type = "text",
  placeholder,
  onChange,
  restProps,
}: Props) => {
  return (
    <div className="mb-4">
      <p>{label}</p>
      <label
        htmlFor={id}
        className="input input-bordered flex items-center gap-2"
      >
        {icon}
        <input
          id={placeholder}
          name={name}
          ref={customRef}
          type={type}
          value={value}
          className="grow"
          placeholder={placeholder}
          {...restProps}
          onChange={onChange}
        />
      </label>
      <small className="text-red-500 italic">{error}</small>
    </div>
  );
};

export default CustomInput;
