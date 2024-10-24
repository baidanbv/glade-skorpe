import axios from 'axios';

const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/user/${userId}`);
    
    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting user: ' + error.message);
  }
};

export default fetchUserById