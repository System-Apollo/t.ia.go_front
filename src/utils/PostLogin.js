import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const apiLogin = async (credentials) => {
  try {
    const response = await axios.post(`https://996b-179-156-170-171.ngrok-free.app/auth/login`, credentials, {
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
