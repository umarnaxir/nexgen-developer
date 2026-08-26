"use client";

import { cn } from "@/lib/utils";
import { adminUi } from "@/lib/admin/ui";

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
      {label && <span className={adminUi.label}>{label}</span>}
      <input
        id={inputId}
        className={cn(
          adminUi.field,
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {hint && !error && <span className={adminUi.hint}>{hint}</span>}
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
      {label && <span className={adminUi.label}>{label}</span>}
      <textarea
        id={inputId}
        className={cn(
          adminUi.textarea,
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {hint && !error && <span className={adminUi.hint}>{hint}</span>}
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
      {label && <span className={adminUi.label}>{label}</span>}
      <select
        id={inputId}
        className={cn(adminUi.field, className)}
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
