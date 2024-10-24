import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { messagesAPI } from '@/api/contact'; 

const useMessages = create(
  devtools((set) => ({
    messages: [],
    loading: false,
    error: null,
    pollingIntervalId: null, 

   
    loadMessages: async () => {
      set({ loading: true, error: null });
      try {
        const messages = await messagesAPI.fetchMessages(); 
        set({ messages, loading: false });
      } catch (error) {
        set({ error: 'Error loading messages', loading: false });
      }
    },

    
    startPolling: (interval = 10000) => {
      const pollingIntervalId = setInterval(async () => {
        try {
          const messages = await messagesAPI.fetchMessages(); 
          set({ messages });
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

export default useMessages;
