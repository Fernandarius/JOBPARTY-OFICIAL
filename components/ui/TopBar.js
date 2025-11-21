'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from '../lib/theme-context';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRole } from '../lib/useRole';

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole } = useRole();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('jp_user');
    if (stored) setUser(JSON.parse(stored));
  }, [pathname]);

  const logout = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem('jp_user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-navy/70 border-b border-slate-200/60 dark:border-white/10 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-mint/80 to-deep/70 flex items-center justify-center shadow-glow">
            <span className="text-lg font-bold text-white">JP</span>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">JobParty</p>
            <p className="text-xs text-slate-600 dark:text-gray-400">Tinder de trabajos sociales</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setRole(role === 'employee' ? 'employer' : 'employee')}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-800 dark:bg-white/10 dark:text-white border border-slate-200 dark:border-white/10 text-xs font-semibold"
            >
              {role === 'employee' ? 'Modo empleado' : 'Modo empleador'}
            </button>
          </div>
          <div className="hidden sm:flex items-center rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 px-1">
            {['employee', 'employer'].map(option => (
              <button
                key={option}
                onClick={() => setRole(option)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${role === option ? 'bg-mint/20 text-deep dark:text-mint shadow-sm' : 'text-slate-600 dark:text-gray-300'}`}
              >
                {option === 'employee' ? 'Empleado' : 'Empleador'}
              </button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="p-2 rounded-xl glass border border-white/10 text-slate-800 dark:text-white"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-sm text-slate-700 dark:text-gray-200">{user.name || user.email}</div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-3 py-2 rounded-xl bg-white text-slate-800 dark:bg-white/10 text-sm dark:text-white border border-slate-200 dark:border-white/10"
              >
                Cerrar sesión
              </motion.button>
            </div>
          ) : (
            pathname !== '/login' && (
              <Link href="/login" className="text-sm font-medium text-mint">
                Ingresar
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
