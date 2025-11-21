'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function SwipeCard({ event, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const background = useTransform(x, [-160, 0, 160], ['#ef4444', '#0ea5e9', '#22c55e']);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120) onSwipe('like');
    else if (info.offset.x < -120) onSwipe('dislike');
  };

  const stats = useMemo(() => (
    [
      { label: 'Pago', value: event.pay },
      { label: 'Fecha', value: event.date },
      { label: 'Tipo', value: event.type }
    ]
  ), [event]);

  return (
    <motion.div
      className="relative w-full max-w-xl mx-auto card-tilt"
      style={{ perspective: 1300 }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x, rotate, backgroundColor: background }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="rounded-3xl p-[1px] bg-gradient-to-r from-mint to-deep shadow-neon"
      >
        <div className="rounded-3xl bg-white text-slate-900 dark:bg-navy/90 dark:text-white p-6 sm:p-8 border border-slate-200/70 dark:border-white/10 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-mint">Evento social</p>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs dark:bg-white/10 dark:text-gray-200 dark:border-white/10">{event.location}</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">{event.title}</h2>
          <p className="mt-2 text-slate-700 dark:text-gray-200 leading-relaxed">{event.description}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {stats.map(item => (
              <div key={item.label} className="rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3">
                <p className="text-xs text-slate-600 dark:text-gray-400">{item.label}</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
