'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'jp_role';

export function useRole() {
  const [role, setRole] = useState('employee');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) || 'employee';
    setRole(stored);
    const handler = () => {
      const updated = window.localStorage.getItem(STORAGE_KEY) || 'employee';
      setRole(updated);
    };
    window.addEventListener('jp-role-change', handler);
    return () => window.removeEventListener('jp-role-change', handler);
  }, []);

  const updateRole = next => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event('jp-role-change'));
    setRole(next);
  };

  return { role, setRole: updateRole };
}
