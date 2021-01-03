import axios from 'axios';
import Settings from '../AppSettings';

const getAllAsync = async () => {
  const response = await axios.get(`${Settings.API_URL}/department`);
  const { data } = response;

  return data;
}

const DepartmentService = {
  getAllAsync
}

export default DepartmentService;