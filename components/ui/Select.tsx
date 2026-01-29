"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all bg-white text-black focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 hover:scale-[1.02] active:scale-[0.98]`}
      >
        <span className="flex-1 text-left text-black">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto"
        >
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2 text-left transition-colors hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-50" : ""
                }`}
              >
                <span className="flex-1 text-sm sm:text-base text-black">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
