import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ordersAPI } from '@/api';

const useOrders = create(
  devtools((set) => ({
    orders: [],
    loading: false,
    error: null,
    pollingIntervalId: null,

    loadOrders: async () => {
      set({ loading: true, error: null });
      try {
        const orders = await ordersAPI.fetchOrders();
        set({ orders, loading: false });
      } catch (error) {
        set({ error: 'Error loading orders', loading: false });
      }
    },

    startPolling: (interval = 10000) => {
      const pollingIntervalId = setInterval(async () => {
        try {
          const orders = await ordersAPI.fetchOrders();
          set({ orders });
        } catch (error) {
          console.error('Error Polling:', error);
        }
      }, interval);

      set({ pollingIntervalId });
    },

    stopPolling: () => {
      set((state) => {
        clearInterval(state.pollingIntervalId);
        return { pollingIntervalId: null };
      });
    }
  }))
);

export default useOrders;
