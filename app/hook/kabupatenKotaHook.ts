import { useEffect, useState } from "react";
import { kabupatenKotaStore } from "../utils/kabupatenKotaUtils";

export const useFetchKabupatenKota = () => {
    const [error1, setError] = useState<string | null>(null);
    const [loading1, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await kabupatenKotaStore.getKabupatenKotaData();
            } catch (err) {
                setError("Failed to fetch complaint types");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        kabupatenKotaList: kabupatenKotaStore.kabupatenkota.slice(),
        loading1,
        error1,
    };
};
