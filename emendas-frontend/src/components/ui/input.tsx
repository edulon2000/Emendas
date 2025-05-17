import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "underline";
};

export const Input: React.FC<InputProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const baseStyles = "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const variantStyles = {
    default: "border-gray-300 bg-white",
    underline: "border-0 border-b border-gray-300 rounded-none",
  };

  return (
    <input
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
};
