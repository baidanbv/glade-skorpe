import axios from 'axios';

const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/category/${categoryId}`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting category: ' + error.message);
  }
};

export default fetchCategoryById;
