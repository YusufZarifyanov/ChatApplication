const Button = ({ text, ...args }) => {
    return (
        <button className="button" {...args}>
            {text}
        </button>
    );
};

export default Button;
