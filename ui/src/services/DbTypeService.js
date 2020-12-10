import axios from 'axios';
import Settings from '../AppSettings';

const { API_URL } = Settings;

const setDatabaseType = async (dbType) => {
  const response = await axios.post(`${API_URL}/Status/Database`, 
    { databaseType: dbType});

  return response.data;
}

const DbTypeService = {
  setDatabaseType,
};

export default DbTypeService;