import { motion } from 'framer-motion';
import Backdrop from '@/components/ui/Backdrop/Backdrop';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 50,
      stiffness: 500
    }
  },
  exit: {
    y: '-100vh',
    opacity: 0
  }
};

const ModalPopup = ({ handlePopup, children, isSuccessMessage, isMenuOpen }) => {
  return (
    <Backdrop handlePopup={handlePopup} isSuccessMessage={isSuccessMessage} isMenuOpen={isMenuOpen}>
      <motion.div onClick={(e) => e.stopPropagation()} className={`${isSuccessMessage ? 'max-w-full' : 'max-w-sm'} max-h-[90vh] w-full sm:p-5 sm:min-w-[50%]  xl:max-w-[30%] 2xl:min-w-[25%] rounded-lg`} variants={dropIn} initial="hidden" animate="visible" exit="exit">
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default ModalPopup;
