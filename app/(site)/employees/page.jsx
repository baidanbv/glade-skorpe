'use client';

import WelcomeSection from '@/components/sections/WelcomeSection/WelcomeSection';
import Employees from '@/components/sections/Employees/Employees';
import Wrapper from '@/components/ui/Wrapper/Wrapper';

const page = () => {
  return (
    <>
      <Wrapper>
        <WelcomeSection title="Personalet hos Den Glade Skorpe" description="Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer." />
        <Employees />
      </Wrapper>
    </>
  );
};

export default page;
