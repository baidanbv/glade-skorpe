import axios from 'axios';

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/orders`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting orders: ' + error.message);
  }
};

export default fetchOrders;

