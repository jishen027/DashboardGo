import { useState, useEffect } from 'react';

interface SimulatedMetrics {
  simSpeed: number;
  simLatency: number;
}

export function useSimulatedMetrics(): SimulatedMetrics {
  const [simSpeed, setSimSpeed] = useState(48.2);
  const [simLatency, setSimLatency] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setSimSpeed((prev) =>
        Math.max(20, Math.min(120, +(prev + (Math.random() * 8 - 4)).toFixed(1)))
      );
      setSimLatency((prev) =>
        Math.max(2, Math.min(45, Math.floor(prev + (Math.random() * 4 - 2))))
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return { simSpeed, simLatency };
}
