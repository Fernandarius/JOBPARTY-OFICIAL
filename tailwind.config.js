/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#020617',
        navy: '#0f172a',
        deep: '#1e3a8a',
        mint: '#2dd4bf'
      },
      boxShadow: {
        glow: '0 10px 30px rgba(45, 212, 191, 0.25)',
        neon: '0 20px 50px rgba(30, 58, 138, 0.35)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.25), transparent 25%), radial-gradient(circle at 80% 0%, rgba(30,58,138,0.2), transparent 20%), radial-gradient(circle at 50% 80%, rgba(45,212,191,0.2), transparent 25%)'
      }
    }
  },
  plugins: []
};
