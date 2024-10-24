'use client';

import useGetCurrentUrl from '@/hooks/useGetCurrentUrl';

import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';

export default function SiteLayout({ children }) {

  useGetCurrentUrl();
  
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

    </>
  );
}
