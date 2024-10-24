import axios from 'axios';

const createOrder = async (data) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/order`, data);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while creating order: ' + error.message);
  }
};

export default createOrder;
