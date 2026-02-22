import { useState, useEffect } from "react";

// Tipe <T> ini biar hook-nya fleksibel bisa buat string, number, dll.
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timer buat update value setelah delay kelar
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Ini kunci debouncing: kalau 'value' berubah lagi sebelum delay beres,
    // timer sebelumnya bakal di-reset (clearTimeout).
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
