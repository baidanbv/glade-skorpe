import { useEffect, useState } from 'react';

import { usePizzaStore, usePizzaCategory } from '@/store/';

import Wrapper from '@/components/ui/Wrapper/Wrapper';
import Title from '@/components/ui/Title/Title';
import PizzaCard from './PizzaCard';
import TabMenu from './TabMenu';

const PizzaTabs = () => {
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const pizzas = usePizzaStore((state) => state.pizzas);
  const loadPizzas = usePizzaStore((state) => state.loadPizzas);

  const categories = usePizzaCategory((state) => state.pizzasCategories);
  const loadPizzasCategories = usePizzaCategory((state) => state.loadPizzasCategories);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilteredPizzas(pizzas.filter((pizza) => pizza.category === category));
  };

  useEffect(() => {
    loadPizzasCategories();
    loadPizzas();
  }, []);

  useEffect(() => {
    setFilteredPizzas(pizzas);
  }, [pizzas]);

  return (
    <>
      <TabMenu categories={categories} onSelect={handleCategorySelect} />
      <Wrapper>
        {selectedCategory !== '' && <Title title={`Alle vores ${selectedCategory}`} />}
        <div className="grid grid-cols-3 justify-between justify-items-center my-6 relative z-0 sm:grid-cols-4 lg:grid-cols-5 lg:justify-center lg:gap-5">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default PizzaTabs;
