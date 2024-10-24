import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { usersAPI } from '@/api';

const useUsers = create(
  devtools((set) => ({
    users: [],
    loadUsers: async () => {
      try {
        const users = await usersAPI.fetchUsers();
        set({ users });
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
  }))
);

export default useUsers;
