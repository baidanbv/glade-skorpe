import axios from 'axios';

const deleteOrderById = async (orderId, token) => {
  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_PATH}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting order: ' + error.message);
  }
};

export default deleteOrderById;
