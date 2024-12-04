import { useEffect, useState } from "react";

// <T>는 useDebounce의 제네릭 타입을 의미합니다.
// 'value'와 'debouncedValue'의 타입이 동일하도록 지정
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
