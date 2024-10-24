import axios from 'axios';

const deleteEmployeeById = async (employeeId, token) => {
  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_PATH}/employee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error while deleting Employee: ' + error.message);
  }
};

export default deleteEmployeeById;
