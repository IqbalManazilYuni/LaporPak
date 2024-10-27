import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';
import { Sertifikat } from '../models/dataSertifikat';
import { useIsFocused } from '@react-navigation/native';

interface Props {
    name: string | undefined
}

const useFetchSertifikat = ({ name }: Props) => {
    const isFocused = useIsFocused();
    const [dataSertifikat, setData] = useState<Sertifikat[]>([]);
    const [loading7, setLoading] = useState(true);
    const [error7, setError] = useState(null);

    const fetchByToken = useCallback(async () => {
        if (name) {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_BASE_URL}/api/sertifikat`);
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

    return { dataSertifikat, loading7, error7, refetch: fetchByToken };
};

export default useFetchSertifikat;
