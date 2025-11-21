'use client';
import { useEffect, useMemo, useState } from 'react';
import { events } from './_data/events';
import EventCard from '@/components/ui/EventCard';
import Modal from '@/components/ui/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedUser = window.localStorage.getItem('jp_user');
    if (savedUser) setSessionUser(JSON.parse(savedUser));
  }, []);

  const stats = useMemo(() => ([
    { label: 'Eventos activos', value: events.length },
    { label: 'Pagos promedio', value: '$130' },
    { label: 'Matches esta semana', value: '32' }
  ]), []);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl glass border border-white/10 p-6 sm:p-8 shadow-neon">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-mint">Demo ready</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">Encuentra tu siguiente gig social</h1>
            <p className="text-gray-300 mt-2">Swipea, guarda y charla con empresas sin salir de esta demo. Todo vive en tu navegador.</p>
          </div>
          {!sessionUser && (
            <Link href="/login" className="px-4 py-3 rounded-2xl bg-mint/20 text-mint border border-mint/40 text-sm font-semibold hover:shadow-glow">
              Ingresar / Crear cuenta
            </Link>
          )}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map(item => (
            <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence>
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <EventCard event={event} onView={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-mint">Evento social</p>
                <h3 className="text-2xl font-semibold text-white">{selected.title}</h3>
                <p className="text-gray-300">{selected.location} • {selected.type}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-mint border border-white/10">{selected.date}</span>
            </div>
            <p className="text-gray-200 leading-relaxed">{selected.description}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-mint/20 text-mint border border-mint/40">{selected.pay}</span>
              <Link href={`/job/${selected.id}`} className="text-white underline">Ir a la ficha</Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
