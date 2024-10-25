import axios from 'axios';

const updateIngredient = async (data, token) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_PATH}/ingredient`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while updating ingredient: ' + error.message);
  }
};

export default updateIngredient;
