import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { categoriesAPI } from '@/api';

const useCategories = create(
  devtools((set) => ({
    categories: [],
    loadCategories: async () => {
      try {
        const categories = await categoriesAPI.fetchCategories();
        set({ categories });
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }
  }))
);

export default useCategories;
