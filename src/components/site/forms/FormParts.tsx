import { forwardRef, useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FieldShell({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  hint?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="ml-0.5 text-gold" aria-hidden>*</span> : <span className="ml-1.5 font-normal text-night-muted">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="err"
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-night-muted">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type Invalid = { invalid?: boolean | undefined };

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & Invalid>(
  ({ invalid, className, id, ...props }, ref) => (
    <input
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className={cn("field-control", className)}
      {...props}
    />
  ),
);
TextInput.displayName = "TextInput";

export interface SelectInputProps extends Invalid {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { name?: string; value: string } }) => void;
  onBlur?: (e: { target: { name?: string } }) => void;
  disabled?: boolean;
  className?: string;
  options: readonly string[];
  placeholder: string;
  allowEmpty?: boolean;
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  ({ invalid, className, id, name, value, defaultValue, onChange, onBlur, disabled, options, placeholder, allowEmpty = false }, ref) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? "");
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const currentValue = value !== undefined ? value : internalValue;

    useEffect(() => {
      if (!open) return;
      function handleOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false);
          onBlur?.({ target: { ...(name ? { name } : {}) } });
        }
      }
      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setOpen(false);
          onBlur?.({ target: { ...(name ? { name } : {}) } });
        }
      }
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, name, onBlur]);

    const handleSelect = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.({ target: { ...(name ? { name } : {}), value: nextValue } });
      setOpen(false);
      onBlur?.({ target: { ...(name ? { name } : {}) } });
    };

    return (
      <div ref={containerRef} className="relative">
        <button
          ref={ref}
          id={id}
          type="button"
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "field-control flex items-center justify-between gap-2 text-left cursor-pointer",
            !currentValue && "text-night-muted/70",
            open && "border-gold bg-night-2/75 ring-4 ring-gold/15",
            className,
          )}
        >
          <span className="truncate">{currentValue || placeholder}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-night-muted transition-transform duration-300",
              open && "rotate-180 text-gold",
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listboxId}
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto overflow-x-hidden rounded-2xl border border-night-border bg-night p-1.5 shadow-elegant backdrop-blur-xl"
            >
              {allowEmpty && (
                <li
                  role="option"
                  aria-selected={currentValue === ""}
                  onClick={() => handleSelect("")}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                    currentValue === ""
                      ? "bg-gold/15 font-medium text-gold"
                      : "text-night-muted hover:bg-night-2/80 hover:text-night-foreground",
                  )}
                >
                  <span>{placeholder}</span>
                  {currentValue === "" && <Check className="h-4 w-4 shrink-0 text-gold" />}
                </li>
              )}
              {options.map((option) => {
                const selected = currentValue === option;
                return (
                  <li
                    key={option}
                    role="option"
                    aria-selected={selected}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                      selected
                        ? "bg-gold/15 font-medium text-gold"
                        : "text-night-foreground hover:bg-night-2/80 hover:text-gold",
                    )}
                  >
                    <span className="pr-2">{option}</span>
                    {selected && <Check className="h-4 w-4 shrink-0 text-gold" />}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
SelectInput.displayName = "SelectInput";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & Invalid>(
  ({ invalid, className, id, ...props }, ref) => (
    <textarea
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className={cn("field-control min-h-32 resize-y", className)}
      {...props}
    />
  ),
);
TextArea.displayName = "TextArea";

/** Off-screen field that only bots fill in. */
export function Honeypot(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
