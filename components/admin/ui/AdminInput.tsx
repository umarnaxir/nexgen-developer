"use client";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function AdminInput({
  className,
  label,
  error,
  hint,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      <input
        id={inputId}
        className={cn(
          "h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-neutral-500">{hint}</span>}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function AdminTextarea({
  className,
  label,
  error,
  hint,
  id,
  ...props
}: TextareaProps) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      <textarea
        id={inputId}
        className={cn(
          "min-h-[110px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-neutral-500">{hint}</span>}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

export function AdminSelect({
  className,
  label,
  options,
  id,
  ...props
}: SelectProps) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      <select
        id={inputId}
        className={cn(
          "h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
