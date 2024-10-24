import Link from 'next/link';

const PizzaCard = ({ pizza }) => {
  return (
    <Link href={`/dish/${pizza._id}`} className="relative w-[100px] h-[100px] overflow-hidden text-2xl text-secondary font-jah flex items-center justify-center before:block before:absolute before:w-full before:h-full before:bg-secondary before:opacity-30 before:z-10 before:top-0 before:left-0 transition-transform duration-300 ease-in-out transform md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] lg:hover:cursor-pointer lg:hover:-translate-y-2">
      <img src={pizza.image} alt={pizza.title} className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <span key={pizza._id} className="relative z-20 text-border text-lg leading-none text-center md:text-xl lg:text-3xl">
        {pizza.title}
      </span>
    </Link>
  );
};

export default PizzaCard;
