'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import { usePathStore, useSingleDishTitle, useCartStore } from '@/store';

import Logo from '@/components/ui/Logo/Logo';
import NavBar from '@/components/layouts/NavBar/NavBar';
import Wrapper from '@/components/ui/Wrapper/Wrapper';

const imageUrl = '/images/headerImg.png';
const cartIcon = '/images/basket_icon.png';

const Header = () => {
  const currentPathName = usePathStore((state) => state.currentPathName);
  const currentDishTitle = useSingleDishTitle((state) => state.currentDishTitle);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const loadCartItems = useCartStore((state) => state.loadCartItems);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const isHomePage = currentPathName === '/';

  return (
    <header className="py-5 min-h-[270px] relative  sm:min-h-[350px] md:min-h-[400px]">
      <div className="absolute inset-0 bg-secondary opacity-80" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="relative z-0">
        <Wrapper>
          <div className="flex items-center justify-between ">
            <Logo />
            <div className="flex gap-4">
              <Link
                href="/cart"
                style={{
                  backgroundImage: `url(${cartIcon})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className="px-4 py-2 text-secondary text-2xl"
              >
                {totalItems}
              </Link>
              <NavBar />
            </div>
          </div>
          <h1 className="text-4xl uppercase text-secondary mx-auto text-center leading-none sm:text-5xl md:text-7xl">
            <span className="text-sm block leading-none sm:text-xl md:text-2xl">den</span>
            Glade<span className="text-xl block leading-none sm:text-2xl md:text-4xl">{`${isHomePage ? 'Skorpe' : currentDishTitle}`}</span>
          </h1>
        </Wrapper>
      </div>
    </header>
  );
};

export default Header;
