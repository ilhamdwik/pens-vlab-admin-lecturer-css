import React from "react";

export const Input = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input
      className={`mt-1 p-2 block w-full focus:outline-none dark:text-gray-200 leading-5 rounded-md focus:border-indigo-400 border border-gray-300 dark:border-blueGray-600 focus:ring focus:ring-indigo-300 dark:focus:border-blueGray-600 dark:focus:ring-blue-600 dark:bg-blueGray-900 ${className}`}
      {...props}
    />
  );
};

export default Input;
