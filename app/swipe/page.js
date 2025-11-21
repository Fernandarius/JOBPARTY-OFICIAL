'use client';
import { useEffect, useMemo, useState } from 'react';
import { events } from '../_data/events';
import SwipeCard from '@/components/ui/SwipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';

const confettiPieces = Array.from({ length: 40 });

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [matchCompany, setMatchCompany] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLikes = JSON.parse(window.localStorage.getItem('jp_likes') || '[]');
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('jp_likes', JSON.stringify(likes));
    if (likes.length > 0 && likes.length % 6 === 0) {
      const company = events[(index + likes.length) % events.length].title.split(' ')[0];
      setMatchCompany(company);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1600);
      createChat(company);
    }
  }, [likes]);

  const current = useMemo(() => events[index % events.length], [index]);

  const handleSwipe = action => {
    if (action === 'like') {
      setLikes(prev => [...prev, current.id]);
    }
    setIndex(prev => (prev + 1) % events.length);
  };

  const createChat = company => {
    if (typeof window === 'undefined') return;
    const chats = JSON.parse(window.localStorage.getItem('jp_chats') || '[]');
    const id = `match-${Date.now()}`;
    chats.push({
      id,
      company: company || 'Nueva empresa',
      status: 'Match',
      messages: [
        { from: 'company', text: '¡Hey! Nos gustó tu vibe, ¿charlamos del evento?' },
        { from: 'user', text: '¡Sí! Me encantaría saber más.' }
      ]
    });
    window.localStorage.setItem('jp_chats', JSON.stringify(chats));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-mint uppercase tracking-[0.3em]">Modo swipe</p>
        <h1 className="text-3xl font-semibold text-white">Likea eventos con vibra</h1>
        <p className="text-gray-300">Arrastra la tarjeta o usa los botones rápidos.</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <SwipeCard event={current} onSwipe={handleSwipe} />
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('dislike')}
            className="h-14 w-14 rounded-full bg-white/5 border border-white/10 text-2xl text-white"
          >
            ✕
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('like')}
            className="h-14 w-14 rounded-full bg-mint/20 border border-mint/40 text-2xl text-white shadow-glow"
          >
            ♥
          </motion.button>
        </div>
      </div>

      {showConfetti && (
        <div className="confetti">
          {confettiPieces.map((_, idx) => (
            <span key={idx} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }} />
          ))}
        </div>
      )}

      <Modal open={!!matchCompany} onClose={() => setMatchCompany(null)}>
        <div className="text-center space-y-3">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-16 w-16 rounded-2xl bg-mint/20 text-3xl flex items-center justify-center mx-auto shadow-glow">
            💫
          </motion.div>
          <h3 className="text-2xl font-semibold text-white">¡Match con {matchCompany}!</h3>
          <p className="text-gray-300">Abrimos un chat automático para que practiques. ¿Qué quieres hacer?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/messages" className="px-4 py-2 rounded-xl bg-mint/20 text-mint border border-mint/40">Ir a mensajes</a>
            <button onClick={() => setMatchCompany(null)} className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10">Seguir swiping</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
