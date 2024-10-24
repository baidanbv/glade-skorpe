import axios from 'axios';

const sendContactForm = async (data) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/message`, data);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while creating message: ' + error.message);
  }
};

export default sendContactForm;
