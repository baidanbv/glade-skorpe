'use client';

import WelcomeSection from '@/components/sections/WelcomeSection/WelcomeSection';
import Wrapper from '@/components/ui/Wrapper/Wrapper';
import Title from '@/components/ui/Title/Title';
import PizzaTabs from '@/components/sections/PizzaTabs/PizzaTabs';

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <WelcomeSection title="Velkommen til Den Glade Skorpe!" description='Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!' />
      </Wrapper>
      <Title title="Vælg kategori" />
      <section className="mt-8">
        <PizzaTabs />
      </section>
    </>
  );
};

export default HomePage;
