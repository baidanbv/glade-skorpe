import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { dishesAPI } from '@/api';

const useDishes = create(
  devtools((set) => ({
    dishes: [],
    loadDishes: async () => {
      try {
        const dishes = await dishesAPI.fetchDishes();
        set({ dishes }); 
      } catch (error) {
        console.error('Error loading dishes:', error);
      }
    }
  }))
);

export default useDishes;
