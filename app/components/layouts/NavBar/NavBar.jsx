'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdMenu, MdClose } from 'react-icons/md';
import Link from 'next/link';

import { usePathStore, usePopup } from '@/store';
import { helpersFunctions } from '@/helpers';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';

const NavBar = () => {
  const { closePopup } = usePopup();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathName = usePathStore((state) => state.currentPathName);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPathName]);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-center items-center text-secondary text-3xl relative z-50">
        {isMenuOpen ? (
          <span onClick={handleMenu}>
            <MdClose className="hover:cursor-pointer" />
          </span>
        ) : (
          <span className="hover:cursor-pointer" onClick={handleMenu}>
            <MdMenu />
          </span>
        )}
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {isMenuOpen && (
          <ModalPopup handlePopup={closePopup} isMenuOpen={isMenuOpen}>
            <nav className={`flex justify-center  transition-transform duration-300 ease-in-out`}>
              <ul>
                {helpersFunctions.navbar.map((item, index) => {
                  const isActive = currentPathName === item.url;
                  return (
                    <li key={index} className="text-[36px] lg:text-[42px]">
                      <Link href={item.url} className={`transition-colors ${isActive ? 'text-secondary' : 'text-background'} hover:text-secondary`}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </ModalPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
