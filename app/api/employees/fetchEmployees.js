import axios from 'axios';

const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/employees`);

    return response.data.data;
  } catch (error) {
    throw new Error('Error while getting employees: ' + error.message);
  }
};

export default fetchEmployees;
