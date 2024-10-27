import axios from 'axios';
import { API_BASE_URL } from '../utils/server';

export const postRegister = async (value: any) => {
    const response = await axios.post(`${API_BASE_URL}/api/pengguna/register`, value, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

