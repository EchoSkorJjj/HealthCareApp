import { useCallback, useEffect, useState } from 'react';
import { LOCAL_STORAGE_EVENT } from './constants';

export const useLocalStorage = (key, initialValue) => {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      if (!value) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      setStoredValue(newValue);
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    } catch {
      // handle errors here
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(LOCAL_STORAGE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(LOCAL_STORAGE_EVENT, handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue];
};
