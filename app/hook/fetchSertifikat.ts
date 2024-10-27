import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { API_BASE_URL } from '../utils/server';
import { Sertifikat } from '../models/dataSertifikat';

interface Props {
    name: string | undefined
}

const useFetchSertifikat = ({ name }: Props) => {
    const [dataSertifikat, setData] = useState<Sertifikat[]>([]);
    const [loading7, setLoading] = useState(true);
    const [error7, setError] = useState(null);

    useEffect(() => {
        const fetchByToken = async () => {
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
                    console.log(dataWithIndex);

                    setData(dataWithIndex);
                } catch (err) {
                    console.log(err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchByToken();
    }, [name]);

    return { dataSertifikat, loading7, error7 };
};

export default useFetchSertifikat;
