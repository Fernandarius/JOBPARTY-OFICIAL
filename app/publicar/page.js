'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const eventOptions = [
  'Matrimonios',
  'Quinceañeros',
  'Activaciones de marca',
  'Eventos corporativos',
  'Conciertos / Festivales',
  'Staff para discotecas / bares',
  'Producción / Backstage'
];

const initialState = {
  title: '',
  type: 'Eventos corporativos',
  location: '',
  date: '',
  timeRange: '',
  payAmount: '',
  payUnit: 'por turno',
  shortDescription: '',
  peopleNeeded: '',
  requirements: '',
  contactInfo: ''
};

export default function PublishPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => setSaved(false), [form]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    ['title', 'type', 'location', 'date', 'timeRange', 'payAmount', 'payUnit', 'shortDescription'].forEach(key => {
      if (!form[key]) newErrors[key] = 'Requerido';
    });
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const job = {
      id: `emp-${Date.now()}`,
      title: form.title,
      type: form.type,
      location: form.location,
      date: form.date,
      timeRange: form.timeRange,
      pay: `S/. ${form.payAmount} ${form.payUnit}`,
      staffNeeded: form.peopleNeeded,
      description: form.shortDescription,
      requirements: form.requirements ? form.requirements.split('\n').filter(Boolean) : [],
      contactInfo: form.contactInfo,
      active: true,
      company: 'Tu anuncio JobParty'
    };

    const stored = JSON.parse(window.localStorage.getItem('employerJobs') || '[]');
    const next = [job, ...stored];
    window.localStorage.setItem('employerJobs', JSON.stringify(next));
    window.dispatchEvent(new Event('jp-employer-jobs'));
    setSaved(true);
    setForm(initialState);
    setTimeout(() => router.push('/'), 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-mint">Modo empleador</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Publica un anuncio</h1>
        <p className="text-slate-700 dark:text-gray-300">Lanza un evento social rápido. Solo guardamos en tu navegador.</p>
      </div>

      <motion.form onSubmit={handleSubmit} className="rounded-3xl glass border border-slate-200/70 dark:border-white/10 p-6 space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Título del anuncio *</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Ej. Staff para matrimonio elegante" />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Tipo de evento *</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10">
              {eventOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Ubicación (ciudad + distrito) *</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Lima - Miraflores" />
            {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Fecha *</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" />
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Horario *</label>
            <input name="timeRange" value={form.timeRange} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="4:00 pm - 11:00 pm" />
            {errors.timeRange && <p className="text-xs text-red-500">{errors.timeRange}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Pago (S/.) *</label>
              <input type="number" name="payAmount" value={form.payAmount} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="230" />
              {errors.payAmount && <p className="text-xs text-red-500">{errors.payAmount}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Unidad *</label>
              <select name="payUnit" value={form.payUnit} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10">
                <option>por turno</option>
                <option>por hora</option>
              </select>
              {errors.payUnit && <p className="text-xs text-red-500">{errors.payUnit}</p>}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Staff requerido (opcional)</label>
            <input type="number" name="peopleNeeded" value={form.peopleNeeded} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="8" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Contacto (teléfono o WhatsApp)</label>
            <input name="contactInfo" value={form.contactInfo} onChange={handleChange} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="WhatsApp: +51 ..." />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Descripción breve *</label>
          <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={3} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Cuenta en 3 líneas de qué trata el evento" />
          {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-800 dark:text-gray-100">Requisitos (uno por línea)</label>
          <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} className="w-full rounded-xl bg-white text-slate-900 border border-slate-200 px-3 py-2 text-sm focus:outline-none dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Vestimenta negra\nExperiencia en catering" />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <motion.button whileTap={{ scale: 0.97 }} type="submit" className="px-4 py-2 rounded-xl bg-mint/20 text-deep dark:text-mint border border-mint/40">
            Publicar
          </motion.button>
          {saved && <span className="text-sm text-green-600 dark:text-green-400">Guardado en tu demo ✔</span>}
        </div>
      </motion.form>
    </div>
  );
}
