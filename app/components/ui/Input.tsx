import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className="
    w-full 
    px-4 py-2 
    text-sm 
    font-sans 
    text-gray-900 
    border border-gray-300 
    rounded-md 
    outline-none 
    focus:border-blue-500
  "
      {...props}
    />
  );
}

export { Input };
