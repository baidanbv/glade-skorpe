import { useForm } from 'react-hook-form';

import { usersAPI } from '@/api';
import { usePopup } from '@/store';

const CreateUser = ({ onSuccess, token }) => {
  const { closePopup } = usePopup();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    await usersAPI.addNewUser(data, token);
    closePopup();
    reset();
    onSuccess();
  };

  return (
    <div className="border border-primary rounded-md p-5">
      <h2 className="text-3xl font-kurale mb-6 text-center text-border text-secondary">Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">
        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="name">
            Name
          </label>
          <input {...register('name', { required: 'Name is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`} id="activity" type="text" placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="email">
            Email
          </label>
          <input {...register('email', { required: 'Email is required' })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} id="email" type="email" autoComplete="username" placeholder="Enter email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="password">
            Password
          </label>
          <input {...register('password', { required: 'Password is required' })} autoComplete="current-password" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`} id="password" type="password" placeholder="Enter password" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-secondary text-border" htmlFor="role">
            Role
          </label>
          <select {...register('role', { required: 'Role is required' })} defaultValue="guest" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.role ? 'border-red-500' : ''}`} id="role">
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline font-kurale" type="submit">
            Add user
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
