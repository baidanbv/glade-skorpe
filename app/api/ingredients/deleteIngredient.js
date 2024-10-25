import axios from 'axios';

const deleteIngredient = async (ingredientId, token) => {
  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_PATH}/ingredient/${ingredientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting ingredient: ' + error.message);
  }
};

export default deleteIngredient;
