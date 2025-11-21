'use client';
import { useEffect, useMemo, useState } from 'react';
import { events as demoEvents } from '@/app/_data/events';

export function useMergedEvents() {
  const [employerJobs, setEmployerJobs] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = JSON.parse(window.localStorage.getItem('employerJobs') || '[]');
    setEmployerJobs(stored);
    const handler = () => {
      const refreshed = JSON.parse(window.localStorage.getItem('employerJobs') || '[]');
      setEmployerJobs(refreshed);
    };
    window.addEventListener('storage', handler);
    window.addEventListener('jp-employer-jobs', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('jp-employer-jobs', handler);
    };
  }, []);

  const merged = useMemo(() => {
    const activeEmployerJobs = employerJobs.filter(job => job.active !== false);
    return [...demoEvents, ...activeEmployerJobs];
  }, [employerJobs]);

  return { events: merged, employerJobs, setEmployerJobs };
}
