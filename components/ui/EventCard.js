'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function EventCard({ event, onView }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  const [isHover, setHover] = useState(false);

  const handleMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="card-tilt"
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative h-full rounded-2xl glass p-4 border border-slate-200/70 dark:border-white/10 shadow-neon"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{event.title}</h3>
            <p className="text-sm text-slate-700 dark:text-gray-300">{event.type} • {event.location}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white text-deep border border-slate-200 text-xs dark:bg-white/10 dark:text-mint dark:border-white/10">{event.date}</span>
        </div>
        <p className="mt-3 text-slate-700 dark:text-gray-200 leading-relaxed line-clamp-3">{event.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-deep dark:text-mint font-semibold">{event.pay}</div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(event)}
              className="px-3 py-2 rounded-xl bg-white text-slate-800 border border-slate-200 text-sm hover:shadow-glow dark:bg-white/10 dark:text-white dark:border-white/10"
            >
              Ver
            </button>
            <Link
              href={`/job/${event.id}`}
              className="px-3 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint text-sm border border-mint/40 hover:bg-mint/30"
            >
              Detalles
            </Link>
          </div>
        </div>
        {isHover && <motion.div layoutId="glow" className="absolute inset-0 rounded-2xl bg-mint/5" />}
      </motion.div>
    </motion.div>
  );
}
