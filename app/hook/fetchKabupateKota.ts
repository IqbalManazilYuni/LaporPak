import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/server';
import { useIsFocused } from '@react-navigation/native';
import { KabupatenKota } from '../models/kabupatenkotaModals';
import axios from 'axios';

const useKabupateKota = () => {
    const isFocused = useIsFocused();
    const [KabupatenKotaList, setData] = useState<KabupatenKota[]>([]);
    const [loading5, setLoading] = useState(true);
    const [error5, setError] = useState(null);
    console.log("ayamm jenis");
    
    useEffect(() => {
        if (isFocused) {
            const fetchByToken = async () => {
                setLoading(true);
                try {
                    console.log("ayam Jenis");
                    
                    const response = await axios.get(`${API_BASE_URL}/api/kabupatenkota`);
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

    return { KabupatenKotaList, loading5, error5 };
};

export default useKabupateKota;
