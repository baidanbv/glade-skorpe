'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ingredientsAPI } from '@/api';
import { useIngredients, usePopup } from '@/store';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import CreateIngredient from '@/components/ui/Forms/CreateIngredient/CreateIngredient';
import UpdateIngredient from '@/components/ui/Forms/UpdateIngredient/UpdateIngredient';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import CreateButton from '@/components/ui/Buttons/CreateButton';
import AdminPageTitle from '@/components/ui/Title/AdminPageTitle';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const ingredients = useIngredients((state) => state.ingredients);
  const loadIngredients = useIngredients((state) => state.loadIngredients);
  const [loading, setLoading] = useState(false);

  const { createFormModal, updateFormModal, id, openPopup, closePopup, openUpdatePopup, closeUpdatePopup, deleteFormModal, openDeletePopup, closeDeletePopup } = usePopup();

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await ingredientsAPI.deleteIngredient(id, token);
      closeDeletePopup();
      loadIngredients();
    } catch (err) {
      console.error('Could not delete ingredients.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    loadIngredients();
  };

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <CreateButton title="Create New" handleClick={openPopup} />
      <AdminPageTitle title="Ingredients"/>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-3/4">
          <thead>
            <tr>
              <th className="border px-4 py-2 ">Name</th>
              <th className="border px-4 py-2 ">Description</th>
              <th className="border px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient._id} className="border-t">
                <td className="border px-4 py-2">{ingredient.name}</td>
                <td className="border px-4 py-2">{ingredient.description}</td>
                <td className="border px-2 py-2">
                  <div className="flex gap-3 justify-center">
                    <ActionButton title="Update" handleClick={() => openUpdatePopup(ingredient._id)} action="update" />
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(ingredient._id)} action="delete" />
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
            <CreateIngredient onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {updateFormModal && (
          <ModalPopup handlePopup={closeUpdatePopup}>
            <UpdateIngredient ingredientId={id} onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette ingredient?"
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
