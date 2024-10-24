import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { employeesAPI } from '@/api';

const useEmployees = create(
  devtools((set) => ({
    employees: [],
    loadEmployees: async () => {
      try {
        const employees = await employeesAPI.fetchEmployees();
        set({ employees });
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    }
  }))
);

export default useEmployees;
