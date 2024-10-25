import axios from 'axios';

const deleteCategory = async (categoryId, token) => {
  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_PATH}/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting category: ' + error.message);
  }
};

export default deleteCategory;
