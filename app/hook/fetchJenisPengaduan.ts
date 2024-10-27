import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';
import { useIsFocused } from '@react-navigation/native';
import { JenisPengaduan } from '../models/jenispengaduanModals';

const useJenisPengaduan = () => {
    const isFocused = useIsFocused();
    const [jenisPengaduan, setData] = useState<JenisPengaduan[]>([]);
    const [loading4, setLoading] = useState(true);
    const [error4, setError] = useState(null);
    useEffect(() => {
        if (isFocused) {
            const fetchByToken = async () => {
                setLoading(true);
                try {
                    console.log("ayam Jenis");
                    
                    const response = await axiosInstance.get(`${API_BASE_URL}/api/jenispengaduan`);
                    setData(response.data.payload);
                } catch (err) {
                    console.log(err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchByToken();
        }
    }, [isFocused]);

    return { jenisPengaduan, loading4, error4 };
};

export default useJenisPengaduan;
