import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useClientName = create(
  devtools((set) => ({
    currentClientName: '',
    setClientName: (newClientName) => set({ currentClientName: newClientName })
  }))
);

export default useClientName;


