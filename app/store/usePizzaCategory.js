import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { dishesAPI } from '@/api';

const usePizzaCategory = create(
  devtools((set) => ({
    pizzasCategories: [],
    loadPizzasCategories: async () => {
      try {
        const pizzasCategories = await dishesAPI.fetchDishesCategories();
        set({ pizzasCategories });
      } catch (error) {
        console.error('Error loading pizzas Categories:', error);
      }
    }
  }))
);

export default usePizzaCategory;
