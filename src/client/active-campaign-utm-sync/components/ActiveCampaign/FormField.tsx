import React from 'react';

export const FormField = ({
  field,
  label,
  value,
  valuesToRender,
  setValue,
}) => {
  return (
    <>
      <label htmlFor={field} className="block mb-2 font-bold text-gray-600">
        {label}:
      </label>

      <select
        id={field}
        name={field}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-2/3 py-1 px-2 border border-gray-400 rounded-md mb-4"
      >
        {valuesToRender}
      </select>
    </>
  );
};
