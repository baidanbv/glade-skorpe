import axios from 'axios';

const updateCategory = async (data, token) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_PATH}/category`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while updating category: ' + error.message);
  }
};

export default updateCategory;
