import deleteUserById from './deleteUserById';
import addNewUser from './addNewUser';
import updateUserById from './updateUserById';
import fetchUserById from './fetchUserById';
import fetchUsers from './fetchUsers';

export const usersAPI = {
  fetchUsers,
  addNewUser,
  fetchUserById,
  updateUserById,
  deleteUserById,
};