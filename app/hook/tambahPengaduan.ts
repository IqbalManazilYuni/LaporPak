import { useState } from "react";
import { reportStore } from "../utils/PengaduanUtils";

export const useCreateReport = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createReport = async (newReport: any) => {
    setLoading(true);
    setError(null);
    try {
      await reportStore.addReport(newReport);
    } catch (err) {
      setError("Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return {
    createReport,
    loading,
    error,
  };
};