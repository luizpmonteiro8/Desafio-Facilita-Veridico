import React from "react";

interface CustomSelectProps {
  label: string;
  options: string[];
  onChange: (selectedOption: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  onChange,
}) => {
  return (
    <div className="mb-2">
      <label className="label">{label}</label>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled selected>
          Selecione...
        </option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
