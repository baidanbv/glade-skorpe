'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { usersAPI } from '@/api';
import { useUsers, usePopup } from '@/store';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import CreateUser from '@/components/ui/Forms/CreateUser/CreateUser';
import UpdateUser from '@/components/ui/Forms/UpdateUser/UpdateUser';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import CreateButton from '@/components/ui/Buttons/CreateButton';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const users = useUsers((state) => state.users);
  const loadUsers = useUsers((state) => state.loadUsers);
  const [loading, setLoading] = useState(false);

  const { createFormModal, updateFormModal, id, openPopup, closePopup, openUpdatePopup, closeUpdatePopup, openDeletePopup, deleteFormModal, closeDeletePopup } = usePopup();

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await usersAPI.deleteUserById(id, token);
      closeDeletePopup();
      loadUsers();
    } catch (err) {
      console.error('Could not delete User.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <CreateButton title="Create New" handleClick={openPopup} />
      <h1 className="capitalize font-kurale text-3xl mb-5 text-border text-secondary">Users</h1>
      <div>
        {users.map((user) => (
          <div key={user._id} className="flex justify-between items-center border-b py-2">
            <h3 className="text-2xl  font-kurale">{user.name}</h3>
            <div className="flex gap-5 text-xl">
              <ActionButton title="Update" handleClick={() => openUpdatePopup(user._id)} action="update" />
              <ActionButton title="Delete" handleClick={() => openDeletePopup(user._id)} action="delete" />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {createFormModal && (
          <ModalPopup handlePopup={closePopup}>
            <CreateUser onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {updateFormModal && (
          <ModalPopup handlePopup={closeUpdatePopup}>
            <UpdateUser userId={id} onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette user?"
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
