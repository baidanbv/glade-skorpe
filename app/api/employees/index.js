import fetchEmployees from './fetchEmployees';
import fetchEmployeeById from './fetchEmployeeById';
import addEmployee from './addEmployee';
import updateEmployeeById from './updateEmployeeById';
import deleteEmployeeById from './deleteEmployeeById';

export const employeesAPI = {
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployeeById
};