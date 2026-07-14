import { useState } from "react";

export function validateCnpj(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  const calc = (d: string, weights: number[]) => {
    const sum = weights.reduce((acc, w, i) => acc + parseInt(d[i], 10) * w, 0);
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calc(digits, w1);
  const d2 = calc(digits, w2);

  return parseInt(digits[12], 10) === d1 && parseInt(digits[13], 10) === d2;
}

export function formatCnpj(digits: string): string {
  const d = digits.slice(0, 14);
  let result = d.slice(0, 2);
  if (d.length > 2) result += "." + d.slice(2, 5);
  if (d.length > 5) result += "." + d.slice(5, 8);
  if (d.length > 8) result += "/" + d.slice(8, 12);
  if (d.length > 12) result += "-" + d.slice(12, 14);
  return result;
}

export function CnpjInput({
  value,
  onChange,
  onBlur,
  name,
  className,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  name?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(() => formatCnpj(value.replace(/\D/g, "")));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 14);
    const masked = formatCnpj(digits);
    setDisplay(masked);
    onChange(masked);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="00.000.000/0000-00"
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
      name={name}
      className={className || "form-input"}
    />
  );
}
