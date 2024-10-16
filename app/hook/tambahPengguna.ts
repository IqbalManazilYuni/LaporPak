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

export const useLoginPengguna = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const loginPengguna = async (credentials: { username: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await penggunaStore.loginPengguna(credentials);
        return result;
      } catch (err) {
        setError("Gagal login");
        return { success: false, message: "Gagal login" };
      } finally {
        setLoading(false);
      }
    };
  
    const logout = () => {
      penggunaStore.logout();
    };
  
    return { loginPengguna, logout, loading, error };
  };
