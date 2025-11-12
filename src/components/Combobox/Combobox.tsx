"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { toast } from "../ui/use-toast";

interface frameworksTypes {
  value: boolean;
  label: string;
}

const frameworks: frameworksTypes[] = [
  {
    value: true,
    label: "Open"
  },
  {
    value: false,
    label: "Closed"
  }
];

interface ComboboxDemoProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ComboboxDemo({ value, setValue }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState<boolean>(false);

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
          {value !== undefined
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
      <PopoverContent className="md:w-[445px] w-full bg-white rounded-xl overflow-hidden">
        <Command className="">
          <CommandList className="">
            <CommandGroup className="">
              {frameworks.map((framework) => (
                <CommandItem
                  className="w-full border-b border-black/30 py-3"
                  key={framework.label}
                  value={framework.value?.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === "true" ? true : false);
                    // toast({
                    //   variant: "default",
                    //   description: currentValue
                    // });
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
