import React from "react";
import clsx from "clsx"; // Você pode usar clsx para facilitar o merge de classes

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "destructive";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "default",
  className,
  ...props
}) => {
  const baseStyles = "rounded-md font-medium transition-colors focus:outline-none";

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const finalClass = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
};
