import { ChangeEvent } from "react";

export const AppInput: React.FC<{
  id?: string;
  value: any;
  type?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<any>) => void;
  readOnly?: boolean;
  disabled?: boolean;
}> = ({
  id,
  className,
  value,
  type,
  label,
  placeholder,
  onChange,
  readOnly,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border-2 w-full p-2 focus:ring-4 rounded-md ${className}`}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};
