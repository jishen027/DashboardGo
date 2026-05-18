import { useState, useEffect } from 'react';

export function useLiveClock(): string {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return currentTime;
}
