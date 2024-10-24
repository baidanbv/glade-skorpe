import axios from 'axios';

const fetchDishes = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/dishes`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting dishes: ' + error.message);
  }
};

export default fetchDishes;
