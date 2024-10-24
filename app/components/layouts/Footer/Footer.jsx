'use client';

import Link from 'next/link';

import Logo from '@/components/ui/Logo/Logo';
import Wrapper from '@/components/ui/Wrapper/Wrapper';

const Footer = () => {
  return (
    <footer className="bg-accent py-5">
      <Wrapper>
        <div className="flex flex-col justify-center items-center gap-5">
          <Logo width="w-20" height="h-20" />
          <div className="flex justify-between items-center w-full text-secondary text-sm lg:justify-evenly lg:text-xl">
            <Link href="mailto:gladskorpe@pizzaglad.dk">Email: gladskorpe@pizzaglad.dk</Link>
            <Link href="tel:+4512345678">Tlf: 12345678</Link>
            <Link href="https://www.google.com/maps/search/?api=1&query=Skorpevej+42,+1234+Pizzabyen" target="_blank">
              Skorpevej 42, 1234 Pizzabyen
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
