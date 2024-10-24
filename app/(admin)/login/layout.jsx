'use client';

import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';

const BackofficeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-10 bg-background">{children}</main>
      <Footer />
    </div>
  );
};

export default BackofficeLayout;
