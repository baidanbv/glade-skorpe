import axios from 'axios';

const fetchEmployeeById = async (employeeId) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/employee/${employeeId}`);

    return response.data.data[0];
  } catch (error) {
    throw new Error('Error while deleting employee: ' + error.message);
  }
};

export default fetchEmployeeById;
