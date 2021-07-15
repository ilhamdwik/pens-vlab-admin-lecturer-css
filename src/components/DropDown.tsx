import React from "react";

export const DropDown = ({
  data,
  onChange,
  disabled,
}: {
  onChange: (value: any) => void;
  disabled?: boolean;
  data: {
    value: string;
    name: string;
  }[];
}) => {
  return (
    <div className="relative inline-block w-full text-gray-700 dark:text-blueGray-400">
      <select
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 p-2 block focus:outline-none dark:text-gray-200 leading-5 focus:border-indigo-400 border-gray-300 dark:border-blueGray-600 focus:ring focus:ring-indigo-300 dark:focus:border-blueGray-600 dark:focus:ring-blue-600 dark:bg-blueGray-900 w-full  pl-3 pr-6 placeholder-gray-600 dark:placeholder-blueGray-200 border rounded focus:shadow-outline bg-white appearance-none "
        placeholder="Regular input"
      >
        {data.map((v) => (
          <option key={v.value} value={v.value}>
            {v.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default DropDown;
