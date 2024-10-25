'use client';

import { useForm } from 'react-hook-form';

import { ingredientsAPI } from '@/api';
import { usePopup } from '@/store';

import SubmitButton from '@/components/ui/Buttons/SubmitButton';

const UpdateIngredient = ({ onSuccess, ingredientId, token }) => {
  const { closeUpdatePopup } = usePopup();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append('id', ingredientId);
      formData.append('name', data.name);
      formData.append('description', data.description);

      await ingredientsAPI.updateIngredient(formData, token);

      closeUpdatePopup();
      onSuccess();
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Update Ingredient</h2>
       <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto flex flex-wrap justify-between">
        <div className="mb-4 w-full">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="name">
            Name
          </label>
          <input {...register('name', { required: 'Name is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`} id="name" type="text" placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4 w-full">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="description">
            Description
          </label>
          <input {...register('description', { required: 'Description is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`} id="name" type="text" placeholder="Enter description" />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="flex items-center justify-center w-full">
          <SubmitButton title="Update" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UpdateIngredient;
