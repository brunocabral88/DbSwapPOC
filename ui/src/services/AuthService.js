import Settings from '../AppSettings';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const API = axios.create({ baseURL: Settings.API_URL })

const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const removeToken = () => localStorage.removeItem('token');

const authenticate = async (email, password) => {
  
  try {
    const response = await API.post('/auth/login', { email, password });

    const { token } = response.data;
    storeToken(token);
    return { success: true };

  } catch (e) {
    const errors = e.response.data.errors;
    console.log(e.response);
    return { success: false, errors};
  }
};

const register = async (email, password) => {

  try {
    const response = await API.post('/auth/register', { email, password });

    const { token } = response.data;

    storeToken(token);
    return { success: true };
    
  } catch (e) {
    const errors = e.response.data.errors;
    return { success: false, errors };
  }
  
}

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) return false;

  const now = new Date();
  if (decodedToken.exp < now.getTime()) {
    removeToken();
    return false;
  }

  return true;
};

const logout = () => {
  removeToken();
}

const AuthService = {
  authenticate,
  register,
  isLoggedIn,
  logout,
};

export default AuthService; 