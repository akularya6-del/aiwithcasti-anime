import type { Metadata } from 'next';
import { Space_Grotesk, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/layout/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import GrainOverlay from '@/components/ui/GrainOverlay';
import Navbar from '@/components/layout/Navbar';

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

const jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIWITHCASTI — The Real Stack',
  description: 'How award-winning websites are really built.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${jp.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <GrainOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
