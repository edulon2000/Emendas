import React from "react";

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-md shadow-md p-4 bg-white">
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...rest }: CardContentProps) {
  return (
    <div className={`p-2 ${className}`} {...rest}>
      {children}
    </div>
  );
}
