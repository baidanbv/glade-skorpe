import axios from 'axios';

const fetchMessages = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/messages`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting messages: ' + error.message);
  }
};

export default fetchMessages;
