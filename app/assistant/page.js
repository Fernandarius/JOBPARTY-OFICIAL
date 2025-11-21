'use client';
import { useEffect, useState } from 'react';
import ChatBubble from '@/components/ui/ChatBubble';
import { motion } from 'framer-motion';

const quickQuestions = [
  '¿Cómo hago un CV rápido?',
  '¿Qué me pongo para un evento nocturno?',
  '¿Qué hago si no me pagan?'
];

const answerFor = text => {
  const lower = text.toLowerCase();
  if (lower.includes('cv')) return 'Enfócate en 1 página: datos, 3 logros cuantificables, habilidades clave y link a portfolio/LinkedIn.';
  if (lower.includes('nocturno') || lower.includes('evento')) return 'Look negro monocromático, calzado cómodo, accesorios mínimos y llevar termo con agua.';
  if (lower.includes('pagan')) return 'Documenta horas trabajadas, solicita contacto de responsable y acuerda forma de pago antes de iniciar.';
  return 'Tip general: sé breve, saluda con energía y pregunta siempre por pago, horario y dress code.';
};

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { from: 'company', text: 'Soy tu guía express para gigs sociales. Dispara tu duda.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = text => {
    if (!text.trim()) return;
    const userMessage = { from: 'user', text: text.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const bot = { from: 'company', text: answerFor(text) };
      setMessages(current => [...current, bot]);
      setTyping(false);
    }, 650);
  };

  useEffect(() => {
    const container = document.getElementById('assistant-scroll');
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, typing]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-mint uppercase tracking-[0.3em]">Guía</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Asistente express</h1>
        <p className="text-slate-700 dark:text-gray-300">Respuestas rápidas y consejos para entrevistas y eventos.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {quickQuestions.map(question => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            key={question}
            onClick={() => send(question)}
            className="px-3 py-2 rounded-xl bg-white text-slate-800 border border-slate-200 text-sm dark:bg-white/10 dark:text-white dark:border-white/10 hover:border-mint/40"
          >
            {question}
          </motion.button>
        ))}
      </div>

      <div id="assistant-scroll" className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-4 h-[60vh] overflow-y-auto space-y-3 flex flex-col">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} from={msg.from} text={msg.text} />
        ))}
        {typing && (
          <div className="self-start bg-white text-slate-800 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/10 rounded-2xl px-3 py-2 typing-dots">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Pregunta lo que necesites"
          className="flex-1 rounded-xl bg-white text-slate-800 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => send(input)}
          className="px-4 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40"
        >
          Enviar
        </motion.button>
      </div>
    </div>
  );
}
