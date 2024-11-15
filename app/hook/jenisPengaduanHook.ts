import { useEffect, useState } from "react";
import { jenisPengaduanStore } from "../utils/JenisPengaduanUtils";
import { penggunaStore } from "../utils/PenggunaUtils";
const { currentUser, logout } = penggunaStore;

export const useFetchJenisPengaduan = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (currentUser) {
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
        }
    }, [currentUser]);

    return {
        jenisPengaduanList: jenisPengaduanStore.jenispengaduan.slice(),
        loading,
        error,
    };
};
