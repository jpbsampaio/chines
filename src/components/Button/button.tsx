import {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({children, className = "", ...props}: ButtonProps) => {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};
