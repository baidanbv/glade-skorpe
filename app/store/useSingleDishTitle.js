import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useSingleDishTitle = create(
  devtools((set) => ({
    currentDishTitle: '',
    setDishTitle: (newDishTitle) => set({ currentDishTitle: newDishTitle })
  }))
);

export default useSingleDishTitle;


