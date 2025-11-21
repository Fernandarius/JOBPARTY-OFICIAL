'use client';
import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const item = window.localStorage.getItem(key);
    if (item) {
      try {
        setStored(JSON.parse(item));
      } catch (err) {
        setStored(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = value => {
    setStored(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      return valueToStore;
    });
  };

  return [stored, setValue];
}
