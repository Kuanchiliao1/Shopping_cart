interface ButtonProps {
  className?: string;
  onClick?: () => void;
  text: string;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
