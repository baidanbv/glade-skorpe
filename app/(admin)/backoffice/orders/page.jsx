'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ordersAPI } from '@/api';
import { useOrders, usePizzaStore, usePopup } from '@/store';
import { helpersFunctions } from '@/helpers';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import Loader from '@/components/layouts/Loader/Loader';
import ActionButton from '@/components/ui/Buttons/ActionButton';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const pizzas = usePizzaStore((state) => state.pizzas);
  const orders = useOrders((state) => state.orders);
  const loadOrders = useOrders((state) => state.loadOrders);
  const loadPizzas = usePizzaStore((state) => state.loadPizzas);

  const [loading, setLoading] = useState(false);
  const { id, openDeletePopup, deleteFormModal, closeDeletePopup } = usePopup();

  const enrichedOrders = helpersFunctions.enrichOrdersWithPizzaTitles(pizzas, orders);
  const sortedOrders = helpersFunctions.sortedByDate(enrichedOrders);

  const changeOrderStatus = async (id, status) => {
    try {
      const data = {
        id,
        shipped: status === 'Shipped' ? true : false
      };
      setLoading(true);
      await ordersAPI.updateOrderById(data, token);
      loadOrders();
    } catch (err) {
      console.error('Could not delete Order.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteById = async (id) => {
    try {
      setLoading(true);
      await ordersAPI.deleteOrderById(id, token);
      closeDeletePopup();
      loadOrders();
    } catch (err) {
      console.error('Could not delete Order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    loadPizzas();
  }, [loadOrders, loadPizzas]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <h1 className="capitalize font-kurale text-3xl mb-5 text-border text-secondary">Orders</h1>
      {orders.length > 0 ? (
        <table className="table-auto border-collapse border w-full font-kurale">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Dishes</th>
              <th className="border px-4 py-2">Comments</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id} className={`border-t ${!order.shipped ? 'font-bold' : ''}`}>
                <td className="border px-4 py-2">
                  <span className=" text-wrap break-all w-[100px] block">{order._id}</span>
                </td>
                <td className="border px-4 py-2">
                  <div>
                    {order.dishes.map((dish) => (
                      <div className="border-b border-accent mb-2" key={`${dish.dish}_${dish.size}`}>
                        <div>
                          {dish.amount} X <span className="text-secondary">{dish.title}</span>
                        </div>
                        <div>
                          <span>Size: </span>
                          <span className="text-secondary">{dish.size}</span>
                        </div>
                        <div>
                          <span>Price: </span>
                          <span className="text-secondary">{dish.price}</span>
                        </div>
                        {dish.extraIngredients.length > 0 && (
                          <div>
                            <span>Extra Ingredients: </span>
                            <span className="text-secondary">{dish.extraIngredients.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">{order.comment}</td>
                <td className="border px-4 py-2 text-center">{order.totalPrice}</td>
                <td className="border px-4 py-2 text-center">{order.shipped ? 'Shipped' : 'Recieved'}</td>
                <td className="border px-2 py-2">
                  <div className="flex flex-col gap-3 justify-center">
                    <select
                      className="bg-accent text-secondary rounded-sm px-2 py-1 cursor-pointer"
                      onChange={(e) => {
                        changeOrderStatus(order._id, e.target.value);
                      }}
                      value={order.shipped ? 'Shipped' : 'Recieved'}
                    >
                      <option value="Recieved">Recieved</option>
                      <option value="Shipped">Shipped</option>
                    </select>
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(order._id)} action="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="font-kurale text-3xl mt-10 text-center text-secondary">Du har ingen ordrer i øjeblikket</p>
      )}

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette order?"
              acceptButton={() => {
                handleDeleteById(id);
              }}
              cancelButton={closeDeletePopup}
            />
          </ModalPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
