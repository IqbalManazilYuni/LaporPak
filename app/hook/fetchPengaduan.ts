import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';
import { Pengaduan } from '../models/pengaduanModals';
import { useIsFocused } from '@react-navigation/native';

interface Props {
    name: string | undefined;
}

const useFetchJumlahPengaduan = ({ name }: Props) => {
    const isFocused = useIsFocused();
    const [data, setData] = useState<Pengaduan[]>([]);
    const [loading1, setLoading] = useState(true);
    const [error1, setError] = useState(null);

    const fetchByToken = useCallback(async () => {
        if (name) {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_BASE_URL}/api/pengaduan`);
                const dataWithIndex = response.data.payload
                    .filter((item: any) => item.nama_pelapor === name)
                    .map((item: any, idx: any) => ({
                        ...item,
                        index: (idx + 1).toString(),
                    }));
                setData(dataWithIndex);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    }, [name]);

    useEffect(() => {
        if (isFocused) {
            fetchByToken();
        }
    }, [fetchByToken, isFocused]);

    return { data, loading1, error1, refetch: fetchByToken };
};

export default useFetchJumlahPengaduan;
