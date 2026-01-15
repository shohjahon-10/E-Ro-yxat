import { useState, useEffect } from "react";

export const useDebounce = (str: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(str);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, str]);

  return debouncedValue;
};
