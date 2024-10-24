import axios from 'axios';

const addNewUser = async (data, token) => {
  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while creating user: ' + error.message);
  }
};

export default addNewUser;
