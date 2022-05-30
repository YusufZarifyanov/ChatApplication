const Input = ({ type = "text", placeholder, value, onChange, ...args }) => {
    return (
        <input
            className="input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            args
        />
    );
};

export default Input;
