import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aetheris',
  description: 'The Crypto Events SuperApp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-cyan-400 font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
