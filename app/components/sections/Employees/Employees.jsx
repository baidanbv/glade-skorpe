import { useEffect } from 'react';

import { useEmployees } from '@/store';

import SingleEmployee from './SingleEmployee';

const Employees = () => {
  const employees = useEmployees((state) => state.employees);
  const loadEmployees = useEmployees((state) => state.loadEmployees);

  useEffect(() => {
    loadEmployees();
  }, []);

  return <section className="flex flex-wrap items-center justify-evenly pb-10">{employees.length > 0 && employees.map((employee) => <SingleEmployee key={employee._id} data={employee} />)}</section>;
};

export default Employees;
