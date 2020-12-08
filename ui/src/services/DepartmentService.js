import axios from 'axios';
import Settings from '../AppSettings';

const getAllAsync = async () => {

  try {
    const response = await axios.get(`${Settings.API_URL}/department`);
    const { data } = response;

    return data;

  } catch (e) {
    console.log(e);
  }
}

const DepartmentService = {
  getAllAsync
}

export default DepartmentService;