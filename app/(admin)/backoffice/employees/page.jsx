'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { employeesAPI } from '@/api';
import { useEmployees, usePopup } from '@/store';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import CreateEmployee from '@/components/ui/Forms/CreateEmployee/CreateEmployee';
import UpdateEmployee from '@/components/ui/Forms/UpdateEmployee/UpdateEmployee';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import CreateButton from '@/components/ui/Buttons/CreateButton';
import AdminPageTitle from '@/components/ui/Title/AdminPageTitle';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const employees = useEmployees((state) => state.employees);
  const loadEmployees = useEmployees((state) => state.loadEmployees);
  const [loading, setLoading] = useState(false);

  const { createFormModal, updateFormModal, id, openPopup, closePopup, openUpdatePopup, closeUpdatePopup, deleteFormModal, openDeletePopup, closeDeletePopup } = usePopup();

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await employeesAPI.deleteEmployeeById(id, token);
      closeDeletePopup();
      loadEmployees();
    } catch (err) {
      console.error('Could not delete employees.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <CreateButton title="Create New" handleClick={openPopup} />
      <AdminPageTitle title="employees"/>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-3/4">
          <thead>
            <tr>
              <th className="border px-4 py-2 ">Name</th>
              <th className="border px-4 py-2 ">Image</th>
              <th className="border px-4 py-2 ">Position</th>
              <th className="border px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-t">
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2 ">
                  <img src={employee.image} alt={employee.name} className="w-12 h-12 object-cover block mx-auto" />
                </td>
                <td className="border px-2 py-2 text-center">{employee.position}</td>
                <td className="border px-2 py-2">
                  <div className="flex gap-3 justify-center">
                    <ActionButton title="Update" handleClick={() => openUpdatePopup(employee._id)} action="update" />
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(employee._id)} action="delete" />
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
            <CreateEmployee onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {updateFormModal && (
          <ModalPopup handlePopup={closeUpdatePopup}>
            <UpdateEmployee employeeId={id} onSuccess={handleSuccess} token={token} />
          </ModalPopup>
        )}
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette medarbejder?"
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
