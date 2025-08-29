import { useState, useEffect } from "react";

/**
 * useDebounced(value, delay)
 * Retorna o value debounced. Usar para search input.
 */
export default function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
