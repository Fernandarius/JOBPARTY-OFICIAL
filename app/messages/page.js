'use client';
import { useEffect, useMemo, useState } from 'react';
import ChatBubble from '@/components/ui/ChatBubble';
import { demoChats } from '../_data/demoChats';
import { motion } from 'framer-motion';

const botReplies = message => {
  const text = message.toLowerCase();
  if (text.includes('pago')) return 'El pago se libera al cierre del evento vía transferencia o efectivo según lo acordado.';
  if (text.includes('horario')) return 'El horario estimado es de 6 horas. Llegar 40 min antes para onboarding.';
  if (text.includes('vestimenta')) return 'Recomendamos negro total, calzado cómodo y sin logos. Lleva una chamarra ligera.';
  return '¡Gracias por escribir! Cualquier duda de pago, horario o vestimenta me dices.';
};

export default function MessagesPage() {
  const [chats, setChats] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('jp_chats');
    if (stored) {
      setChats(JSON.parse(stored));
    } else {
      setChats(demoChats);
      window.localStorage.setItem('jp_chats', JSON.stringify(demoChats));
    }
  }, []);

  useEffect(() => {
    if (!selectedId && chats.length) setSelectedId(chats[0].id);
  }, [chats, selectedId]);

  const selectedChat = useMemo(() => chats.find(c => c.id === selectedId), [chats, selectedId]);

  const persistChats = updated => {
    setChats(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jp_chats', JSON.stringify(updated));
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const updated = chats.map(chat => chat.id === selectedId ? {
      ...chat,
      messages: [...chat.messages, { from: 'user', text: userText }]
    } : chat);
    setInput('');
    persistChats(updated);
    setTyping(true);
    setTimeout(() => {
      const botText = botReplies(userText);
      const afterBot = updated.map(chat => chat.id === selectedId ? {
        ...chat,
        status: 'Visto',
        messages: [...chat.messages, { from: 'company', text: botText }]
      } : chat);
      persistChats(afterBot);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Conversaciones</h2>
        <div className="space-y-2 p-2 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          {chats.map(chat => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              className={`w-full text-left rounded-2xl border px-4 py-3 bg-white text-slate-900 dark:bg-white/5 ${selectedId === chat.id ? 'border-mint/50' : 'border-slate-200/70 dark:border-white/10'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold">{chat.company}</p>
                  {chat.jobTitle && (
                    <p className="text-xs text-slate-600 dark:text-gray-300 line-clamp-1">{chat.jobTitle}</p>
                  )}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-mint/20 text-deep dark:text-mint border border-mint/40">{chat.status}</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-gray-300 line-clamp-1">{chat.messages[chat.messages.length - 1]?.text}</p>
              {chat.jobDate && chat.jobLocation && (
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">{chat.jobDate} • {chat.jobLocation}</p>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-4 flex flex-col h-[70vh]">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
              <div>
                <p className="text-sm text-mint uppercase tracking-[0.3em]">Chat demo</p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedChat.company}</h3>
                {selectedChat.jobTitle && (
                  <p className="text-sm text-slate-700 dark:text-gray-300">{selectedChat.jobTitle}</p>
                )}
              </div>
              <span className="text-xs text-slate-600 dark:text-gray-300">Estado: {selectedChat.status}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 py-4 flex flex-col">
              {selectedChat.messages.map((message, idx) => (
                <ChatBubble key={idx} from={message.from} text={message.text} />
              ))}
              {typing && (
                <div className="self-start bg-white text-slate-800 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/10 rounded-2xl px-3 py-2 typing-dots">
                  <span></span><span></span><span></span>
                </div>
              )}
            </div>
            <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe algo..."
                className="flex-1 rounded-xl bg-white text-slate-800 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={sendMessage}
                className="px-4 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40"
              >
                Enviar
              </motion.button>
            </div>
          </>
        ) : (
          <p className="text-slate-700 dark:text-gray-300">Selecciona un chat para empezar.</p>
        )}
      </div>
    </div>
  );
}
