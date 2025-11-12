"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option<T> {
  label: string;
  value: T;
}

interface CustomSelectProps<T> {
  label?: string;
  placeholder?: string;
  options: Option<T>[];
  value?: T;
  setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  className?: string;
}

export function CustomSelect<T extends string | number | boolean>({
  label,
  placeholder = "Select an option",
  options,
  value,
  setValue,
  className
}: CustomSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={cn(
          "w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white py-3 px-4 text-left shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none",
          open && "ring-2 ring-orange-400"
        )}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => {
                setValue(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition",
                value === opt.value && "bg-orange-100 font-semibold"
              )}
            >
              {opt.label}
              {value === opt.value && (
                <Check className="h-4 w-4 text-orange-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
