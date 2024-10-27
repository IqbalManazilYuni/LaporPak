import { useState } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';

const usePostPengaduan = () => {
    const [loading6, setLoading] = useState(false);
    const [error6, setError] = useState(null);

    const postPengaduan = async (formData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(
                `${API_BASE_URL}/api/pengaduan`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Error posting pengaduan:", error);
        } finally {
            setLoading(false);
        }
    };

    return { postPengaduan, loading6, error6 };
};

export default usePostPengaduan;
