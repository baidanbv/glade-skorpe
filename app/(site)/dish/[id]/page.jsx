'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { dishesAPI, ingredientsAPI } from '@/api';
import { useSingleDishTitle, useCartStore } from '@/store';
import Loader from '@/components/layouts/Loader/Loader';
import Title from '@/components/ui/Title/Title';
import Button from '@/components/ui/Buttons/Button';
import CustomMultipleSelect from '@/components/ui/CustomMultipleSelect/CustomMultipleSelect';

const Page = () => {
  const { id } = useParams();
  const [dishData, setDishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedExtraIngredients, setSelectedExtraIngredients] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const setDishTitle = useSingleDishTitle((state) => state.setDishTitle);
  const addToCart = useCartStore((state) => state.addToCart);

  setTimeout(() => {
    setIsAdded(false);
  }, 2000);

  const handleAddToCart = () => {
    const size = Object.keys(dishData.price).find((key) => {
      return dishData.price[key].toString() === selectedPrice.toString();
    });

    if (!size) {
      console.error('Selected size not found');
      return;
    }

    const itemToAdd = {
      id: dishData._id,
      title: dishData.title,
      price: selectedPrice,
      image: dishData.image,
      extraIngredients: selectedExtraIngredients,
      ...(Object.keys(dishData.price).length > 1 && { size })
    };

    addToCart(itemToAdd);
    setIsAdded(true);
  };

  useEffect(() => {
    if (id) {
      const fetchDishData = async () => {
        try {
          const data = await dishesAPI.fetchDishById(id);
          const ingredients = await ingredientsAPI.fetchIngredients();
          setDishData(data);
          setDishTitle(data.title);
          setSelectedPrice(data.price.normal);
          setIngredients(ingredients);
          setLoading(false);
        } catch (error) {
          console.error('Error loading data', error);
          setLoading(false);
        }
      };

      fetchDishData();
    }
  }, [id]);

  if (loading) return <Loader />;

  if (dishData) {
    const priceKeys = Object.keys(dishData.price);

    return (
      <div className="text-center mb-10 lg:flex lg:flex-wrap lg:items-center lg:justify-evenly lg:container lg:mx-auto">
        <div className="pt-12 pb-6  text-center lg:flex lg:items-center lg:justify-center lg:gap-10 lg:w-full">
          <img src={dishData.image} alt={dishData.title} className="w-52 h-52 object-cover mb-5 block mx-auto lg:inline lg:mx-0 lg:w-40 lg:h-40 xl:h-52 xl:w-52" />
          <div className="py-10 bg-background lg:bg-transparent lg:flex lg:items-start lg:gap-20">
            <div>
              <h1 className="text-2xl text-border text-secondary mb-7 md:text-4xl">{dishData.title}</h1>
              {dishData.ingredients.map((ingredient) => (
                <p key={ingredient} className="text-[15px] mb-3 md:text-lg">
                  {ingredient}
                </p>
              ))}
            </div>

            <div>
              <CustomMultipleSelect ingredients={ingredients} selectedExtraIngredients={selectedExtraIngredients} setSelectedExtraIngredients={setSelectedExtraIngredients} />
              {selectedExtraIngredients.length > 0 && (
                <>
                  <h3 className="text-2xl text-border text-secondary mb-2 md:text-4xl"> Du tilføj extra:</h3>
                  {selectedExtraIngredients.map((extra) => (
                    <p key={extra} className="text-[15px] mb-1 md:text-lg">
                      {extra}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {priceKeys.length > 1 && (
          <div className="lg:w-full">
            <Title title="Vælg størrelse" />
            <select
              id="priceSelect"
              value={selectedPrice}
              onChange={(e) => {
                setSelectedPrice(e.target.value);
              }}
              className=" p-2 bg-[#F7E8E1] focus:outline-none w-2/3 mx-auto block my-5 drop-shadow sm:w-52"
            >
              {priceKeys.map((key) => (
                <option key={key} value={dishData.price[key]}>
                  {key === 'normal' ? 'Almindelig' : key === 'family' ? 'Familie' : key}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="lg:w-full">
          <Title title="Pris" />
          <p className="text-center text-3xl mb-5">{selectedPrice},-</p>
          <Button title={`Tilføj ${dishData.title} til kurven`} py="py-4" px="px-6" onClick={handleAddToCart} />
        </div>

        {isAdded && <span className="fixed top-5 left-0 right-0 bg-accent text-secondary  py-2 text center rounded-sm"> {dishData.title} in kurv</span>}
      </div>
    );
  }
  return null;
};

export default Page;
