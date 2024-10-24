import axios from 'axios';

const updateEmployeeById = async (data, token) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_PATH}/employee`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while updating employee: ' + error.message);
  }
};

export default updateEmployeeById;
