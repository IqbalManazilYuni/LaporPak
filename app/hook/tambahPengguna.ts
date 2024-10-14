import { useState } from "react";
import { penggunaStore } from "../utils/PenggunaUtils";

export const useCreatePengguna = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createPengguna = async (newPengguna: any) => {
        setLoading(true);
        setError(null);
        try {
            const result = await penggunaStore.addPengguna(newPengguna);
            return result;
        } catch (err) {
            setError("Failed to create report");
            return { success: false, message: "Failed to create report" };
        } finally {
            setLoading(false);
        }
    };

    return { createPengguna, loading, error };
};
