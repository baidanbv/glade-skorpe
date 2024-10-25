import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ingredientsAPI } from '@/api';

const useIngredients = create(
  devtools((set) => ({
    ingredients: [],
    loadIngredients: async () => {
      try {
        const ingredients = await ingredientsAPI.fetchIngredients();
        set({ ingredients });
      } catch (error) {
        console.error('Error loading ingredients:', error);
      }
    }
  }))
);

export default useIngredients;
