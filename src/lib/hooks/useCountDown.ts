import { useState, useEffect } from "react";

export const useCountDown = (second: number) => {
  const [counter, setCounter] = useState(second);

  useEffect(() => {
    if (!counter) return;
    if (counter <= 0) return;
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return { counter };
};
