import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { dishesAPI } from '@/api';

const usePizzaStore = create(
  devtools((set) => ({
    pizzas: [],
    loadPizzas: async () => {
      try {
        const pizzas = await dishesAPI.fetchDishes();
        set({ pizzas });
      } catch (error) {
        console.error('Error loading pizzas:', error);
      }
    }
  }))
);

export default usePizzaStore;
