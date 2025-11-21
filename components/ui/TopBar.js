'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from '../lib/theme-context';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

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
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-navy/70 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-mint/80 to-deep/70 flex items-center justify-center shadow-glow">
            <span className="text-lg font-bold text-white">JP</span>
          </div>
          <div>
            <p className="font-semibold text-white leading-tight">JotParty</p>
            <p className="text-xs text-gray-400">Tinder de trabajos sociales</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="p-2 rounded-xl glass border border-white/10 text-white"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-sm text-gray-200">{user.name || user.email}</div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-3 py-2 rounded-xl bg-white/10 text-sm text-white border border-white/10"
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
