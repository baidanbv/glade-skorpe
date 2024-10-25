'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { categoriesAPI } from '@/api';
import { useCategories, usePopup } from '@/store';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import CreateCategory from '@/components/ui/Forms/CreateCategory/CreateCategory';
import UpdateCategory from '@/components/ui/Forms/UpdateCategory/UpdateCategory';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import CreateButton from '@/components/ui/Buttons/CreateButton';
import AdminPageTitle from '@/components/ui/Title/AdminPageTitle';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const categories = useCategories((state) => state.categories);
  const loadCategories = useCategories((state) => state.loadCategories);
  const [loading, setLoading] = useState(false);

  const { createFormModal, updateFormModal, id, openPopup, closePopup, openUpdatePopup, closeUpdatePopup, deleteFormModal, openDeletePopup, closeDeletePopup } = usePopup();

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await categoriesAPI.deleteCategory(id, token);
      closeDeletePopup();
      loadCategories();
    } catch (err) {
      console.error('Could not delete categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <CreateButton title="Create New" handleClick={openPopup} />
      <AdminPageTitle title="Categories"/>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-3/4">
          <thead>
            <tr>
              <th className="border px-4 py-2 ">Name</th>
              <th className="border px-4 py-2 ">Image</th>
              <th className="border px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-t">
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2 ">
                  <img src={category.image} alt={category.name} className="w-12 h-12 object-cover block mx-auto" />
                </td>
                <td className="border px-2 py-2">
                  <div className="flex gap-3 justify-center">
                    <ActionButton title="Update" handleClick={() => openUpdatePopup(category._id)} action="update" />
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(category._id)} action="delete" />
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
            <CreateCategory onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {updateFormModal && (
          <ModalPopup handlePopup={closeUpdatePopup}>
            <UpdateCategory categoryId={id} onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette kategori?"
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
