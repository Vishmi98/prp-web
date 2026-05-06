import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-2 text-sm font-semibold rounded-md tracking-wide transition-all duration-300",

        // Variants
        variant === "primary" &&
        "bg-gold text-white",

        variant === "outline" &&
        "border border-black text-black hover:bg-black hover:text-white",

        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;