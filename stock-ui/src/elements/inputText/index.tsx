import "./index.scss";

interface inputTextProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<inputTextProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="inputtext">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default InputText;
