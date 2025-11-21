'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useMergedEvents } from '@/components/lib/useMergedEvents';
import { upsertChatForJob } from '@/components/lib/chatUtils';

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { events } = useMergedEvents();
  const [liked, setLiked] = useState(false);

  const event = useMemo(() => events.find(ev => ev.id === id), [events, id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const likes = JSON.parse(window.localStorage.getItem('jp_likes') || '[]');
    setLiked(likes.includes(id));
  }, [id]);

  const handleLike = () => {
    if (typeof window === 'undefined') return;
    const likes = JSON.parse(window.localStorage.getItem('jp_likes') || '[]');
    const next = likes.includes(id) ? likes.filter(item => item !== id) : [...likes, id];
    window.localStorage.setItem('jp_likes', JSON.stringify(next));
    setLiked(next.includes(id));
  };

  const applyToJob = () => {
    if (!event) return;
    upsertChatForJob(event, 'Hola, recibimos tu interés. Te avisamos pronto.');
    router.push('/messages');
  };

  if (!event) return <div className="text-slate-700 dark:text-gray-200">Evento no encontrado.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-3xl glass p-6 border border-slate-200/70 dark:border-white/10 shadow-neon">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mint">Ficha de evento</p>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{event.title}</h1>
            <p className="text-slate-700 dark:text-gray-300">{event.type} • {event.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white text-deep border border-slate-200 text-xs dark:bg-white/10 dark:text-mint dark:border-white/10">{event.date}</span>
            {event.timeRange && (
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs dark:bg-white/10 dark:text-gray-100 dark:border-white/10">{event.timeRange}</span>
            )}
          </div>
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white border border-slate-200 dark:border-white/10 p-4">
            <p className="text-xs text-slate-600 dark:text-gray-400">Pago</p>
            <p className="text-lg font-semibold">{event.pay}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white border border-slate-200 dark:border-white/10 p-4">
            <p className="text-xs text-slate-600 dark:text-gray-400">Ubicación</p>
            <p className="text-lg font-semibold">{event.location}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white border border-slate-200 dark:border-white/10 p-4">
            <p className="text-xs text-slate-600 dark:text-gray-400">Staff requerido</p>
            <p className="text-lg font-semibold">{event.staffNeeded || event.peopleNeeded || 'Por definir'}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Descripción</h3>
          <p className="text-slate-700 dark:text-gray-200 leading-relaxed">{event.description}</p>
        </div>

        {event.requirements?.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Requisitos</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-gray-200 space-y-1">
              {event.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
          </div>
        )}

        {event.contactInfo && (
          <div className="mt-4 space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contacto</h3>
            <p className="text-slate-700 dark:text-gray-200">{event.contactInfo}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={applyToJob} className="px-4 py-2 rounded-xl text-sm bg-mint/20 text-deep dark:text-mint border border-mint/40">
            Aplicar
          </button>
          <button onClick={handleLike} className={`px-4 py-2 rounded-xl text-sm border ${liked ? 'bg-mint/20 text-deep dark:text-mint border-mint/50' : 'bg-white text-slate-800 border-slate-200 dark:bg-white/5 dark:text-white dark:border-white/10'}`}>
            {liked ? 'Guardado' : 'Guardar' }
          </button>
          <Link href="/swipe" className="px-4 py-2 rounded-xl text-sm bg-white text-slate-800 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/10">
            Seguir swiping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
