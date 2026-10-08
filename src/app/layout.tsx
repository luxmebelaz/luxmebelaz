import type { Metadata } from 'next';
import { Inter, Antonio } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const antonio = Antonio({ subsets: ['latin'], variable: '--font-antonio', weight: ['100', '200', '300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'EGO - Modern Lamps',
  description: 'Light Shapes Every Space',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${antonio.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
