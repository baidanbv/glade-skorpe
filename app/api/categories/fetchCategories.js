import axios from 'axios';

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/categories`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting categories: ' + error.message);
  }
};

export default fetchCategories;
