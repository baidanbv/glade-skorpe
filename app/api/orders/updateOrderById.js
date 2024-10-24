import axios from 'axios';

const updateOrderById = async (data, token) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_PATH}/order`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while updating order: ' + error.message);
  }
};

export default updateOrderById;
