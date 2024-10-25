'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { employeesAPI } from '@/api';
import { usePopup } from '@/store';

import SubmitButton from '@/components/ui/Buttons/SubmitButton';
import Loader from '@/components/layouts/Loader/Loader';

const UpdateEmployee = ({ onSuccess, employeeId, token }) => {
  const { closeUpdatePopup } = usePopup();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('id', employeeId);
      formData.append('name', data.name);
      formData.append('position', data.position);

      if (data.image[0]) {
        formData.append('file', data.image[0]);
      }

      await employeesAPI.updateEmployeeById(formData, token);

      closeUpdatePopup();
      onSuccess();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      const employeeData = await employeesAPI.fetchEmployeeById(employeeId);

      reset({
        name: employeeData.name,
        position: employeeData.position
      });

      setLoading(false);
    };

    fetchEmployee();
  }, [employeeId, reset]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Update Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">
        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="name">
            Name
          </label>
          <input {...register('name', { required: 'Name is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`} id="name" type="text" placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm  mb-2 text-secondary text-border" htmlFor="position">
            Position
          </label>
          <input {...register('position', { required: 'Position is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.position ? 'border-red-500' : ''}`} id="position" type="text" placeholder="Enter position" />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="image">
            Image
          </label>
          <input {...register('image')} className={`shadow appearance-none border rounded w-full text-secondary py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`} id="image" type="file" accept="image/*" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>

        <div className="flex items-center justify-center">
          <SubmitButton title="Update Employee" type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
