'use client';

import { useForm } from 'react-hook-form';

import { useClientName } from '@/store';
import { messagesAPI } from '@/api';

import Button from '@/components/ui/Buttons/Button';

const ContactForm = () => {
  const clientName = useClientName((state) => state.setClientName);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    await messagesAPI.sendMessage(data);
    console.log(data);
    reset();
    clientName(data.name);
  };

  return (
    <div className="bg-background mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5  px-6 py-5 text-center font-kurale sm:max-w-[600px] sm:mx-auto lg:max-w-[800px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-border text-secondary">
            Navn
          </label>
          <input id="name" {...register('name', { required: true })} className="border border-primary px-4 py-2 outline-none bg-transparent drop-shadow" />
          {errors.name && <p className="text-red-500 text-[12px]">Dette felt er obligatorisk</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-border text-secondary">
            Emne
          </label>
          <input id="subject" type="text" {...register('subject', { required: true })} className="border border-primary px-4 py-2 outline-none bg-transparent drop-shadow" />
          {errors.subject && <p className="text-red-500 text-[12px]">Dette felt er obligatorisk</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-border text-secondary">
            Beskrivelse
          </label>
          <textarea id="description" {...register('description', { required: true })} className="border border-primary px-4 py-2 outline-none bg-transparent drop-shadow" rows={5} />
          {errors.description && <p className="text-red-500 text-[12px]">Dette felt er obligatorisk</p>}
        </div>
        <Button title="Send" type="submit" py="py-4" px="px-24" />
      </form>
    </div>
  );
};

export default ContactForm;
