import axios from 'axios';
import Settings from '../AppSettings';

const getAllEmployeesAsync = async () => {

  const response = await axios.get(`${Settings.API_URL}/employee`);
  const { data } = response;

  return data;
}

const EmployeeService = {
  getAllEmployeesAsync,
}

export default EmployeeService;