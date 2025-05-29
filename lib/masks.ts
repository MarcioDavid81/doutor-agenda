export function maskPhone(value: string) {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");
  const length = numbers.length;

  if (length <= 2) {
    return `(${numbers}`;
  }
  if (length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}
