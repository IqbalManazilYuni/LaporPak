import { flow, types } from "mobx-state-tree";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";
import { DetailPengaduanModels } from "../models/detailPengaduan";
import { penggunaStore } from "./PenggunaUtils";

const { currentUser, logout } = penggunaStore;

const DetailPengaduanStore = types
    .model("DetailPengaduanStore", {
        detailpengaduan: types.array(DetailPengaduanModels),
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        getDataDetailPengaduan: flow(function* () {
            self.loading = true;
            self.error = null;
            try {
                const response = yield axiosInstance.get(
                    `${API_BASE_URL}/api/pengaduan`
                );
                // Filter the data based on the current user's username
                const dataWithIndex = response.data.payload
                    .filter((item: any) => item.nama_pelapor === currentUser?.username) // Filtering based on nama_pelapor
                    .map((item: any, idx: any) => ({
                        ...item,
                        index: (idx + 1).toString(),
                    }));

                self.detailpengaduan = dataWithIndex;
            } catch (err) {
                self.error = "Failed to fetch complaint types";
            } finally {
                self.loading = false;
            }
        })
    }));

export const detailPengaduanStore = DetailPengaduanStore.create({
    detailpengaduan: [],
    loading: false,
    error: null,
});
