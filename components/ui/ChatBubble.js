'use client';
import { motion } from 'framer-motion';

export default function ChatBubble({ from, text }) {
  const isUser = from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${isUser ? 'bg-mint/20 text-white self-end' : 'bg-white/10 text-gray-100 self-start border border-white/10'}`}
    >
      {text}
    </motion.div>
  );
}
