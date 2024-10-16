import { flow, types } from "mobx-state-tree";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";
import { DetailPengaduanModels } from "../models/detailPengaduan";

const DetailPengaduanStore = types
    .model("DetailPengaduanStore", {
        detailpengaduan: types.array(DetailPengaduanModels),
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        getDataDetailPengaduan: flow(function* () {
            console.log("ayam1");
            
            self.loading = true;
            self.error = null;
            try {
                const response = yield axiosInstance.get(
                    `${API_BASE_URL}/api/pengaduan`
                );
                self.detailpengaduan = response.data.payload;
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
