"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "open",
    label: "Open"
  },
  {
    value: "closed",
    label: "Closed"
  }
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-none rounded-[6px] py-3 px-4 text-start text-[#9E9E9E] relative overflow-hidden"
          style={{
            border: "1px solid var(--Color-Blue-Gray-300, #B6BAC3)",
            boxShadow: " 0px 1px 2px 0px #1018280D"
          }}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Restaurant status (open/close)"}
          <svg
            width={20}
            height={20}
            className="absolute right-4 top-3"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#6B7280"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full bg-red-500">
          <CommandList className="w-full">
            <CommandGroup className="w-full">
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
