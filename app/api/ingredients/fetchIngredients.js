import axios from 'axios';

const fetchIngredients = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/ingredients`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting ingredients: ' + error.message);
  }
};

export default fetchIngredients;

