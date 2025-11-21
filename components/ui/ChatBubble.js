'use client';
import { motion } from 'framer-motion';

export default function ChatBubble({ from, text }) {
  const isUser = from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${isUser
        ? 'bg-mint/20 text-slate-900 dark:text-white self-end border border-mint/40'
        : 'bg-white text-slate-800 dark:bg-white/10 dark:text-gray-100 self-start border border-slate-200/70 dark:border-white/10'}`}
    >
      {text}
    </motion.div>
  );
}
