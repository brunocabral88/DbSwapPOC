import axios from 'axios';
import Settings from '../AppSettings';

const { API_URL } = Settings;

const getDatabaseOptions = async () => {
  const response = await axios.get(`${API_URL}/Status/Database`);
  return response.data;
}

const setDatabaseType = async (dbType) => {
  const response = await axios.post(`${API_URL}/Status/Database`, 
    { databaseType: dbType});

  return response.data;
}

const DbTypeService = {
  getDatabaseOptions,
  setDatabaseType,
};

export default DbTypeService;