'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

const Backdrop = ({ children, handlePopup, isSuccessMessage = false, isMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const mainElement = document.querySelector('main');
    const footerElement = document.querySelector('footer');

    if (isMenuOpen) {
      if (mainElement) {
        mainElement.style.position = 'relative';
        mainElement.style.zIndex = '-100';
      }
      if (footerElement) {
        footerElement.style.position = 'relative';
        footerElement.style.zIndex = '-100';
      }
    }

    return () => {
      document.body.style.overflow = '';

      if (mainElement) {
        mainElement.style.position = '';
        mainElement.style.zIndex = '';
      }
      if (footerElement) {
        footerElement.style.position = '';
        footerElement.style.zIndex = '';
      }
    };
  }, []);

  return (
    <motion.div onClick={handlePopup} className={`fixed z-40 top-0 left-0 bottom-0 w-full h-full flex justify-center items-center bg-accent opacity-70`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ pointerEvents: 'auto' }}>
      {isSuccessMessage && (
        <>
          <div className="absolute z-0 bg-[#FFF7EC]  w-full h-full">
            <div className="absolute z-10 bg-[#FFF7EC] opacity-70  w-full h-full"></div>
            <img src="images/ananas.png" alt="Success" className="absolute z-0  object-cover w-full h-full" />
          </div>
          <MdClose className="hover:cursor-pointer absolute right-5 top-5 z-20 text-4xl text-secondary" onClick={handlePopup} />
        </>
      )}
      {children}
    </motion.div>
  );
};

export default Backdrop;
