'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { dishesAPI } from '@/api';
import { useDishes, usePopup } from '@/store';
import { helpersFunctions } from '@/helpers';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import CreateDish from '@/components/ui/Forms/CreateDish/CreateDish';
import UpdateDish from '@/components/ui/Forms/UpdateDish/UpdateDish';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import CreateButton from '@/components/ui/Buttons/CreateButton';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const dishes = useDishes((state) => state.dishes);
  const loadDishes = useDishes((state) => state.loadDishes);
  const [loading, setLoading] = useState(false);

  const { createFormModal, updateFormModal, id, openPopup, closePopup, openUpdatePopup, closeUpdatePopup, deleteFormModal, openDeletePopup, closeDeletePopup } = usePopup();

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await dishesAPI.deleteDishById(id, token);
      closeDeletePopup();
      loadDishes();
    } catch (err) {
      console.error('Could not delete employees.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    loadDishes();
  };

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  if (loading) {
    return <Loader />;
  }

  const sortedDishes = helpersFunctions.sortedByDate(dishes);

  return (
    <div className="relative">
      <CreateButton title="Create New" handleClick={openPopup} />
      <h1 className="capitalize font-kurale text-3xl mb-5 text-border text-secondary">dishes</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 ">Title</th>
              <th className="border px-4 py-2 ">Image</th>
              <th className="border px-4 py-2 ">Ingredients</th>
              <th className="border px-4 py-2 ">Price</th>
              <th className="border px-4 py-2 ">Price (family)</th>
              <th className="border px-4 py-2 ">Category</th>
              <th className="border px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDishes.map((dish) => (
              <tr key={dish._id} className="border-t">
                <td className="border px-4 py-2">{dish.title}</td>
                <td className="border px-4 py-2">
                  <img src={dish.image} alt={dish.title} className="w-12 h-12 object-cover" />
                </td>
                <td className="border px-2 py-2">{dish.ingredients.join(', ')}</td>
                <td className="border px-2 py-2">{dish.price.normal},-</td>
                <td className="border px-2 py-2">{dish.price.family && `${dish.price.family},-`}</td>
                <td className="border px-2 py-2">{dish.category}</td>
                <td className="border px-2 py-2">
                  <div className="flex gap-3">
                    <ActionButton title="Update" handleClick={() => openUpdatePopup(dish._id)} action="update" />
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(dish._id)} action="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {createFormModal && (
          <ModalPopup handlePopup={closePopup}>
            <CreateDish onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {updateFormModal && (
          <ModalPopup handlePopup={closeUpdatePopup}>
            <UpdateDish dishId={id} onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette produkt?"
              acceptButton={() => {
                handleDeleteById(id);
              }}
              cancelButton={closeDeletePopup}
            />
          </ModalPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
