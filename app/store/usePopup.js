import { create } from 'zustand';

const usePopup = create((set) => ({
  createFormModal: false,
  updateFormModal: false,
  deleteFormModal: false,
  id: null,

  openPopup: () => set({ createFormModal: true }),
  closePopup: () => set({ createFormModal: false }),

  openUpdatePopup: (id) => set({ updateFormModal: true, id }),
  closeUpdatePopup: () => set({ updateFormModal: false, id: null }),

  openDeletePopup: (id) => set({ deleteFormModal: true, id }),
  closeDeletePopup: () => set({ deleteFormModal: false, id: null })
}));

export default usePopup;
