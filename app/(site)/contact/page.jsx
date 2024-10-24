'use client';

import { AnimatePresence } from 'framer-motion';

import { useClientName } from '@/store';

import SuccessMessage from '@/components/ui/SuccessMessage/SuccessMessage';
import WelcomeSection from '@/components/sections/WelcomeSection/WelcomeSection';
import Wrapper from '@/components/ui/Wrapper/Wrapper';
import ContactForm from '@/components/ui/ContactForm/ContactForm';
import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';

const page = () => {
  const clientName = useClientName((state) => state.currentClientName);

  const setClientNameStore = useClientName((state) => state.setClientName);

  const closePopup = () => {
    setClientNameStore('');
  };

  return (
    <>
      <Wrapper>
        <WelcomeSection title="Har du spørgsmål eller ønsker du at bestille din favoritpizza?" description="Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!" />
      </Wrapper>
      <ContactForm />
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {clientName !== '' && (
          <ModalPopup handlePopup={closePopup} isSuccessMessage={true}>
            <SuccessMessage clientName={clientName} />
          </ModalPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default page;
