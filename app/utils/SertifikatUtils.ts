import { flow, types } from "mobx-state-tree";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";
import { penggunaStore } from "./PenggunaUtils";
import { SertifikatModels } from "../models/sertifikat";

const { currentUser, logout } = penggunaStore;

const SertifikatStore = types
    .model("SertifikatStore", {
        sertifikat: types.array(SertifikatModels),
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        reset: () => {
            self.sertifikat = [];
        },
        getDataSertifikat: flow(function* () {
            self.loading = true;
            self.error = null;
            if (currentUser !== null) {
                try {
                    const response = yield axiosInstance.get(
                        `${API_BASE_URL}/api/sertifikat`
                    );

                    const dataWithIndex = response.data.payload
                        .filter((item: any) => item.nama_pelapor === currentUser?.name)
                        .map((item: any, idx: any) => ({
                            ...item,
                            index: (idx + 1).toString(),
                        }));
                    self.sertifikat = dataWithIndex;
                } catch (err) {
                    self.error = "Failed to fetch complaint types";
                } finally {
                    self.loading = false;
                }
            }

        })
    }));

export const sertifikatStore = SertifikatStore.create({
    sertifikat: [],
    loading: false,
    error: null,
});
