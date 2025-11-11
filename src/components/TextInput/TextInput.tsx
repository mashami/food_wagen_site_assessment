"use client";

import React, { useState } from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
}

export default function TextInput({
  label,
  placeholder = "",
  name,
  required = false
}: TextInputProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const error = required && touched && !value.trim();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        className={`w-full px-4 py-3 border rounded-[6px] overflow-hidden${
          error ? "border-red-400" : "border-transparent"
        } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 transition`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{`${
          label || placeholder
        } is required`}</p>
      )}
    </div>
  );
}
