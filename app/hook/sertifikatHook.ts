import { useEffect, useState } from "react";
import { sertifikatStore } from "../utils/SertifikatUtils";
import { penggunaStore } from "../utils/PenggunaUtils";
const { currentUser, logout } = penggunaStore;

export const useFetchSertifikat = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    await sertifikatStore.getDataSertifikat();
                } catch (err) {
                    setError("Failed to fetch complaint types");
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    return {
        sertifikatList: sertifikatStore.sertifikat.slice(),
        loading,
        error,
    };
};