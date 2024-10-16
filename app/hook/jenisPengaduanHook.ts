import { useEffect, useState } from "react";
import { jenisPengaduanStore } from "../utils/JenisPengaduanUtils";

export const useFetchJenisPengaduan = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await jenisPengaduanStore.getJenisPengaduanData();
            } catch (err) {
                setError("Failed to fetch complaint types");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        jenisPengaduanList: jenisPengaduanStore.jenispengaduan.slice(),
        loading,
        error,
    };
};
