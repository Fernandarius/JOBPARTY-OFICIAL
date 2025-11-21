'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    const user = { email, name: email.split('@')[0] || 'Usuario' };
    window.localStorage.setItem('jp_user', JSON.stringify(user));
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-mint uppercase tracking-[0.3em]">Acceso demo</p>
        <h1 className="text-3xl font-semibold text-white">Inicia sesión</h1>
        <p className="text-gray-300">No hay validaciones reales. Solo guarda tu email en localStorage.</p>
      </div>

      <form onSubmit={handleLogin} className="rounded-3xl glass border border-white/10 p-6 space-y-4">
        <label className="block space-y-1">
          <span className="text-sm text-gray-300">Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-gray-300">Contraseña</span>
          <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none" />
        </label>
        <motion.button whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3 rounded-xl bg-mint/20 text-mint border border-mint/40 font-semibold">
          Iniciar sesión demo
        </motion.button>
      </form>
    </div>
  );
}
