'use client';
import { useEffect, useMemo, useState } from 'react';
import EventCard from '@/components/ui/EventCard';
import Modal from '@/components/ui/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMergedEvents } from '@/components/lib/useMergedEvents';
import { useRole } from '@/components/lib/useRole';

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const { events, employerJobs, setEmployerJobs } = useMergedEvents();
  const { role } = useRole();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedUser = window.localStorage.getItem('jp_user');
    if (savedUser) setSessionUser(JSON.parse(savedUser));
  }, []);

  const stats = useMemo(() => ([
    { label: 'Eventos activos', value: events.length },
    { label: 'Pago promedio', value: 'S/. 230' },
    { label: 'Matches Perú', value: '32' }
  ]), [events.length]);

  const toggleJobActive = jobId => {
    const updated = employerJobs.map(job => job.id === jobId ? { ...job, active: job.active === false ? true : false } : job);
    setEmployerJobs(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('employerJobs', JSON.stringify(updated));
      window.dispatchEvent(new Event('jp-employer-jobs'));
    }
  };

  const feed = useMemo(() => events.filter(ev => ev.active !== false), [events]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-6 sm:p-8 shadow-neon">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-mint">Demo ready</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">Encuentra tu siguiente gig social</h1>
            <p className="text-slate-700 dark:text-gray-300 mt-2">Swipea, guarda y charla con empresas peruanas sin salir de esta demo. Todo vive en tu navegador.</p>
          </div>
          {!sessionUser && (
            <Link href="/login" className="px-4 py-3 rounded-2xl bg-mint/20 text-deep dark:text-mint border border-mint/40 text-sm font-semibold hover:shadow-glow">
              Ingresar / Crear cuenta
            </Link>
          )}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map(item => (
            <div key={item.label} className="rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white border border-slate-200 dark:border-white/10 p-4 text-center">
              <p className="text-xs text-slate-600 dark:text-gray-400">{item.label}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {role === 'employer' ? (
        <section className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-5 sm:p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-mint">Modo empleador</p>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Tus anuncios</h2>
              <p className="text-slate-700 dark:text-gray-300">Publica gigs sociales en Lima, Arequipa o donde quieras.</p>
            </div>
            <Link href="/publicar" className="px-4 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40">
              Crear anuncio
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {employerJobs.length === 0 && (
              <p className="text-slate-700 dark:text-gray-300">Aún no creas anuncios. Empieza con “Crear anuncio”.</p>
            )}
            {employerJobs.map(job => (
              <div key={job.id} className="rounded-2xl bg-white text-slate-900 dark:bg-white/5 dark:text-white border border-slate-200 dark:border-white/10 p-4 flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-mint">Publicado</p>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-slate-700 dark:text-gray-300">{job.date} • {job.location}</p>
                  <p className="text-sm text-slate-600 dark:text-gray-300">Staff: {job.staffNeeded || job.peopleNeeded || 'Por definir'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/job/${job.id}`} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 text-sm dark:bg-white/10 dark:text-white dark:border-white/10">Ver</Link>
                  <button onClick={() => toggleJobActive(job.id)} className="px-3 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40 text-sm">
                    {job.active === false ? 'Activar' : 'Desactivar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence>
            {feed.map((event, idx) => (
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
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-mint">Evento social</p>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{selected.title}</h3>
                <p className="text-slate-700 dark:text-gray-300">{selected.location} • {selected.type}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-deep border border-slate-200 text-xs dark:bg-white/10 dark:text-mint dark:border-white/10">{selected.date}</span>
            </div>
            <p className="text-slate-700 dark:text-gray-200 leading-relaxed">{selected.description}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-mint/20 text-deep dark:text-mint border border-mint/40">{selected.pay}</span>
              <Link href={`/job/${selected.id}`} className="text-deep dark:text-white underline">Ir a la ficha</Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
