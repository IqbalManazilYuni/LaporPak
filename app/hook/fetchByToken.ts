import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';
import { Pengguna } from '../models/penggunaModels';
import { useIsFocused } from '@react-navigation/native';

const useFetchUserByToken = () => {
    const isFocused = useIsFocused();
    const [userData, setUserData] = useState<Pengguna | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchByToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axiosInstance.post(`${API_BASE_URL}/api/pengguna/getuser-bytoken`, { token }, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);

            console.log(response.data);
            setUserData(response.data.data);
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchByToken();
        }
    }, [isFocused]);

    return { userData, loading, error };
};

export default useFetchUserByToken;
