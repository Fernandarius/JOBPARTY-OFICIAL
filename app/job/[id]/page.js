'use client';
import { useParams, useRouter } from 'next/navigation';
import { events } from '../../_data/events';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = events.find(ev => ev.id === id);
  const [liked, setLiked] = useState(false);

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

  if (!event) return <div className="text-gray-200">Evento no encontrado.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-3xl glass p-6 border border-white/10 shadow-neon">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mint">Ficha</p>
            <h1 className="text-3xl font-semibold text-white">{event.title}</h1>
            <p className="text-gray-300">{event.location} • {event.type}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-mint border border-white/10">{event.date}</span>
        </div>
        <p className="mt-4 text-lg text-white font-semibold">{event.pay}</p>
        <p className="mt-2 text-gray-200 leading-relaxed">{event.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={handleLike} className={`px-4 py-2 rounded-xl text-sm border ${liked ? 'bg-mint/20 text-mint border-mint/50' : 'bg-white/5 text-white border-white/10'}`}>
            {liked ? 'Guardado' : 'Guardar' }
          </button>
          <Link href="/swipe" className="px-4 py-2 rounded-xl text-sm bg-mint/20 text-mint border border-mint/40">
            Seguir swiping
          </Link>
          <button onClick={() => router.push('/messages')} className="px-4 py-2 rounded-xl text-sm bg-white/10 text-white border border-white/10">
            Enviar mensaje demo
          </button>
        </div>
      </div>
    </motion.div>
  );
}
