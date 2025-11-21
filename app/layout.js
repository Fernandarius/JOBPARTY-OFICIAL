import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/lib/theme-context';
import FooterNav from '@/components/ui/FooterNav';
import TopBar from '@/components/ui/TopBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JobParty — Demo',
  description: 'Tinder de trabajos para eventos sociales en Perú'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col pb-20">
            <TopBar />
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            <FooterNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
