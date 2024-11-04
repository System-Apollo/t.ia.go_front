import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const apiLogin = async (credentials) => {
  try {
    const response = await axios.post(`https://dcda-187-32-212-210.ngrok-free.app/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const api = {
  Login: apiLogin,
};

export default api;
