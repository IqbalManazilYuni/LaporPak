import { useEffect, useState } from "react";
import { reportStore } from "../utils/PengaduanUtils";
import { detailPengaduanStore } from "../utils/DetailPengaduanUtils";

export const useCreateReport = () => {
  const [error2, setError] = useState<string | null>(null);
  const [loading2, setLoading] = useState<boolean>(false);

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
    loading2,
    error2,
  };
};

export const useFetchDetailPengaduan = () => {
  const [error3, setError] = useState<string | null>(null);
  const [loading3, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await detailPengaduanStore.getDataDetailPengaduan();
      } catch (err) {
        setError("Failed to fetch complaint types");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    detailPengaduanList: detailPengaduanStore.detailpengaduan.slice(),
    loading3,
    error3,
  };
};
