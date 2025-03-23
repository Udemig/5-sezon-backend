import { FC } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  text: string;
  to: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, to, className }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 border bg-dark-08 border-dark-15 w-fit px-4 py-2 rounded-md hover:bg-dark-15 transition ${className}`}
    >
      <span className="whitespace-nowrap">{text}</span>
      <FaArrowRight className="text-yellow-55 rotate-[310deg]" />
    </Link>
  );
};

export default Button;
