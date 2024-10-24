import { useForm } from 'react-hook-form';

import { employeesAPI } from '@/api';
import { usePopup } from '@/store';

const CreateEmployee = ({ onSuccess, token }) => {
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
      formData.append('position', data.position);

      if (data.image[0]) {
        formData.append('file', data.image[0]);
      }

      await employeesAPI.addEmployee(formData, token);
      closePopup();
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating employee:', error.message);
    }
  };

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">
        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="name">
            Name
          </label>
          <input {...register('name', { required: 'Name is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`} id="name" type="text" placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm  mb-2 text-secondary text-border" htmlFor="position">
            Position
          </label>
          <input {...register('position', { required: 'Position is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.position ? 'border-red-500' : ''}`} id="position" type="text" placeholder="Enrer price" />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
        </div>

        <div className="mb-4 ">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="image">
            Image
          </label>
          <input {...register('image')} className={`shadow appearance-none border rounded w-full text-secondary py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`} id="image" type="file" accept="image/*" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>

        <div className="flex items-center justify-center ">
          <button className="bg-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline font-kurale" type="submit">
            Add new employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
