import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Theme } from './theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Navbar } from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <UserProvider>
        <body className={inter.className}>
          <Theme dataTheme="cyberpunk">
            <Navbar />
            {children}
          </Theme>
          <ToastContainer />
        </body>
      </UserProvider>
    </html>
  );
}
