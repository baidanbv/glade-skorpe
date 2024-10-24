import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const usePathStore = create(
  devtools((set) => ({
    currentPathName: '/',
    setPathname: (newPathname) => set({ currentPathName: newPathname })
  }))
);

export default usePathStore;
