
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/main-layout';
import { Inter, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { PlayerProfileProvider } from '@/contexts/PlayerProfileProvider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Career Clash',
  description: 'Enter the Ultimate Career Arena. Where Learning Meets Gaming • Forge Your Future.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <PlayerProfileProvider>
            <MainLayout>
            {children}
            </MainLayout>
            <Toaster />
        </PlayerProfileProvider>
      </body>
    </html>
  );
}
