'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
  { href: '/', label: 'Inicio', icon: '🏠' },
  { href: '/swipe', label: 'Emparejar', icon: '✨' },
  { href: '/messages', label: 'Mensajes', icon: '💬' },
  { href: '/profile', label: 'Perfil', icon: '👤' },
  { href: '/assistant', label: 'Guía', icon: '🤖' }
];

export default function FooterNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 backdrop-blur-lg bg-white/85 dark:bg-navy/80 border-t border-slate-200/60 dark:border-white/10 shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between px-4 py-2.5">
        {tabs.map(tab => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 text-xs sm:text-sm ${active ? 'text-deep dark:text-mint' : 'text-slate-600 dark:text-gray-300'}`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
                {active && <motion.div layoutId="nav-active" className="h-1 w-10 bg-mint rounded-full" />}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
