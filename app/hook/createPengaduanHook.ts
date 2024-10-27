import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';

export const postPengaduan = async (value: any) => {
    const response = await axiosInstance.post(`${API_BASE_URL}/api/pengaduan`, value, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

