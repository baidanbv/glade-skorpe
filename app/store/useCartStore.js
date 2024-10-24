import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useCartStore = create(
  devtools((set) => ({
    cartItems: [],

    addToCart: (dish) => {
      set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === dish.id && item.size === dish.size);

        if (existingItem) {
          const updatedCartItems = state.cartItems.map((item) => (item.id === dish.id && item.size === dish.size ? { ...item, amount: item.amount + 1 } : item));
          if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          }
          return { cartItems: updatedCartItems };
        } else {
          const existingItemDifferentSize = state.cartItems.find((item) => item.id === dish.id);

          if (existingItemDifferentSize) {
            const newCartItem = { ...dish, amount: 1 };
            const newCartItems = [...state.cartItems, newCartItem];
            if (typeof window !== 'undefined') {
              localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            }
            return { cartItems: newCartItems };
          } else {
            const newCartItems = [...state.cartItems, { ...dish, size: dish.size, amount: 1 }];
            if (typeof window !== 'undefined') {
              localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            }
            return { cartItems: newCartItems };
          }
        }
      });
    },

    increaseQuantity: (dishId, size) => {
      set((state) => {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === dishId && item.size === size
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
        return { cartItems: updatedCartItems };
      });
    },

    decreaseQuantity: (dishId, size) => {
      set((state) => {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === dishId && item.size === size && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
        return { cartItems: updatedCartItems };
      });
    },

    removeFromCart: (dish) => {
      set((state) => {
        const updatedCartItems = state.cartItems.filter(
          (item) => !(item.id === dish.id && item.size === dish.size)
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
        return { cartItems: updatedCartItems };
      });
    },

    clearCart: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartItems');
      }
      set({ cartItems: [] });
    },

     loadCartItems: () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          set({ cartItems: JSON.parse(storedCartItems) });
        }
      }
    },

    getTotalItems: () => {
      const state = useCartStore.getState();
      return state.cartItems && state.cartItems.length
        ? state.cartItems.reduce((total, item) => total + item.amount, 0)
        : 0; 
    }
  }))
);

export default useCartStore;
