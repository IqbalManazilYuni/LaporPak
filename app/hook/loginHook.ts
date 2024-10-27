import axios from 'axios';
import { API_BASE_URL } from '../utils/server';

interface LoginResponse {
  token: string;
}

export const postLogin = async (value: { username: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/api/pengguna/login`, value, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};
