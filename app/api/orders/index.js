import createOrder from './createOrder'
import fetchOrders from './fetchOrders'
import updateOrderById from './updateOrderById'
import deleteOrderById from './deleteOrderById'

export const ordersAPI = {
  fetchOrders,
  createOrder,
  updateOrderById,
  deleteOrderById
};