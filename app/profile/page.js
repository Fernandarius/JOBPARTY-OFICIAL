'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const emptyProfile = {
  name: '',
  lastName: '',
  city: '',
  phone: '',
  bio: '',
  skills: '',
  cv: ''
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('jp_profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('jp_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const reset = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.clear();
    setProfile(emptyProfile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-mint uppercase tracking-[0.3em]">Perfil</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Tu identidad laboral</h1>
        </div>
        {saved && <span className="text-sm text-green-600 dark:text-mint">✓ Guardado</span>}
      </div>

      <div className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Nombre" name="name" value={profile.name} onChange={handleChange} />
          <Input label="Apellido" name="lastName" value={profile.lastName} onChange={handleChange} />
          <Input label="Ciudad / Distrito" name="city" value={profile.city} onChange={handleChange} />
          <Input label="Teléfono" name="phone" value={profile.phone} onChange={handleChange} />
        </div>
        <Input label="Bio" name="bio" value={profile.bio} onChange={handleChange} textarea />
        <Input label="Habilidades (coma separadas)" name="skills" value={profile.skills} onChange={handleChange} />
        <div className="space-y-2">
          <label className="text-sm text-slate-700 dark:text-gray-300">Carga de CV (simulado)</label>
          <input
            type="file"
            onChange={e => setProfile(prev => ({ ...prev, cv: e.target.files?.[0]?.name || '' }))}
            className="text-sm text-slate-700 dark:text-gray-200"
          />
          {profile.cv && <p className="text-xs text-green-600 dark:text-mint">Archivo: {profile.cv}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button whileTap={{ scale: 0.97 }} onClick={saveProfile} className="px-4 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40">
            Guardar perfil
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={reset} className="px-4 py-2 rounded-xl bg-white text-slate-800 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/10">
            Reset demo
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, textarea, ...props }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-slate-700 dark:text-gray-300">{label}</span>
      {textarea ? (
        <textarea
          {...props}
          rows={4}
          className="w-full rounded-2xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
        />
      ) : (
        <input
          {...props}
          className="w-full rounded-2xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
        />
      )}
    </label>
  );
}
