import { useEffect, useState } from 'react';

interface IProps {
  initValue: string;
  delay?: number;
}
const useDebounce: (payload: IProps) => string = ({ initValue, delay }) => {
  const [debounceValue, setDebounceValue] = useState(initValue);
  useEffect(() => {
    const timeoutDebounce = setTimeout(() => {
      setDebounceValue(initValue);
    }, delay || 300);

    return () => clearTimeout(timeoutDebounce);
  }, [initValue, delay]);

  return debounceValue;
};
export default useDebounce;
