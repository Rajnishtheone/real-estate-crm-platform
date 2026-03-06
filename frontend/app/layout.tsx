import './globals.css';
import { Providers } from '../components/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Real Estate Platform',
  description: 'Marketplace, CRM, and NRI management for consultants',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
