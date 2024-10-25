import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { dishesAPI } from '@/api';
import { usePopup, useCategories } from '@/store';

import SubmitButton from '@/components/ui/Buttons/SubmitButton';

const CreateDish = ({ onSuccess, token }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = useCategories((state) => state.categories);
  const loadCategories = useCategories((state) => state.loadCategories);
  const { closePopup } = usePopup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const normalPrice = Number(data.normalPrice);
      const familyPrice = data.familyPrice ? Number(data.familyPrice) : null;
      const ingredients = Array.isArray(data.ingredients) ? data.ingredients : data.ingredients.split(',');

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append(
        'price',
        JSON.stringify({
          normal: normalPrice,
          ...(familyPrice && { family: familyPrice })
        })
      );
      formData.append('ingredients', ingredients.join(','));
      formData.append('category', data.category);

      if (data.image[0]) {
        formData.append('file', data.image[0]);
      }

      await dishesAPI.createNewDish(formData, token);
      closePopup();
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating dish:', error.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Add Dish</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto flex flex-wrap justify-between">
        <div className="mb-4 w-[48%]">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="title">
            Title
          </label>
          <input {...register('title', { required: 'Title is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`} id="title" type="text" placeholder="Enter title" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-4 w-[48%]">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="category">
            Category
          </label>
          <select {...register('category', { required: 'Category is required', onChange: handleCategoryChange })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.category ? 'border-red-500' : ''}`} id="category">
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        <div className={`${selectedCategory === 'Pizzaer' ? 'w-[48%]' : 'w-full'} mb-4`}>
          <label className="block text-sm  mb-2 text-secondary text-border" htmlFor="normalPrice">
            Price(almidelig)
          </label>
          <input {...register('normalPrice', { required: 'Price is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.normalPrice ? 'border-red-500' : ''}`} id="normalPrice" type="text" placeholder="Enrer price" />
          {errors.normalPrice && <p className="text-red-500 text-xs mt-1">{errors.normalPrice.message}</p>}
        </div>

        {selectedCategory === 'Pizzaer' && (
          <div className="mb-4 w-[48%]">
            <label className="block text-sm  mb-2 text-secondary text-border" htmlFor="familyPrice">
              Price(familie)
            </label>
            <input {...register('familyPrice', { required: 'Price is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.familyPrice ? 'border-red-500' : ''}`} id="familyPrice" type="text" placeholder="Enrer price" />
            {errors.familyPrice && <p className="text-red-500 text-xs mt-1">{errors.familyPrice.message}</p>}
          </div>
        )}

        <div className="mb-4 w-full">
          <label className="block  text-sm mb-2 text-secondary text-border" htmlFor="ingredients">
            Ingredients
          </label>
          <textarea {...register('ingredients', { required: 'Ingredients is required' })} className={`min-h-[70px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ingredients ? 'border-red-500' : ''}`} id="ingredients" placeholder="Enter ingredients separated by comma" />
          {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>}
        </div>

        <div className="mb-4 w-full">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="image">
            Image
          </label>
          <input {...register('image')} className={`shadow appearance-none border rounded w-full text-secondary py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`} id="image" type="file" accept="image/*" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>

        <div className="flex items-center justify-center w-full">
          <SubmitButton title=" Add new dish" type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default CreateDish;
