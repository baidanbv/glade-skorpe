import axios from 'axios';

const fetchDishById = async (dishId) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/dish/${dishId}`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting dish: ' + error.message);
  }
};

export default fetchDishById;
