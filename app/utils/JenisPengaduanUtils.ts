import { flow, types } from "mobx-state-tree";
import { JenisPengaduanModel } from "../models/jenispengaduan";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";

const JenisPengaduanStore = types
    .model("JenisPengaduanStore", {
        jenispengaduan: types.array(JenisPengaduanModel),
        loading: types.boolean,
        error: types.maybeNull(types.string)
    })
    .actions((self) => ({
        getJenisPengaduanData: flow(function* () {
            self.loading = true;
            self.error = null;
            try {
                const response = yield axiosInstance.get(
                    `${API_BASE_URL}/api/jenispengaduan`,
                );
                self.jenispengaduan = response.data.payload;
            } catch (err) {
                self.error = "Failed to fetch complaint types";
            } finally {
                self.loading = false;
            }
        })
    }));
export const jenisPengaduanStore = JenisPengaduanStore.create({
    jenispengaduan: [],
    loading: false,
    error: null
})