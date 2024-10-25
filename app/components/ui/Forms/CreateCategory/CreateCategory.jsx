import { useForm } from 'react-hook-form';

import { categoriesAPI } from '@/api';
import { usePopup } from '@/store';

import SubmitButton from '@/components/ui/Buttons/SubmitButton';

const CreateCategory = ({ onSuccess, token }) => {
  const { closePopup } = usePopup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {

      const formData = new FormData();
      formData.append('name', data.name);

      if (data.image[0]) {
        formData.append('file', data.image[0]);
      }

      await categoriesAPI.createCategory(formData, token);
      closePopup();
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating category:', error.message);
    }
  };

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto flex flex-wrap justify-between">
        <div className="mb-4 w-full">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="name">
            Name
          </label>
          <input {...register('name', { required: 'Name is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`} id="name" type="text" placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4 w-full">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="image">
            Image
          </label>
          <input {...register('image')} className={`shadow appearance-none border rounded w-full text-secondary py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`} id="image" type="file" accept="image/*" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>

        <div className="flex items-center justify-center w-full">
          <SubmitButton title="Add new category" type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
