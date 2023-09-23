import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationBar } from './components/navigationBar';
import { Providers } from './config/redux/provider';
import { MobileNavigationBar } from './components/mobileMenu';
import { Footer } from './components/footer';

const inter = Inter( { subsets: [ 'latin' ] } );

export const metadata: Metadata = {
  title: 'Movies Home',
  description: 'Lisrt of Movies today',
};

export default function RootLayout ( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Providers>
          <MobileNavigationBar />
          <NavigationBar />
          { children }
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
