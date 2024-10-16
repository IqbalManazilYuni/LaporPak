import { flow, types } from "mobx-state-tree";
import { KabupatenKotaModel } from "../models/kabupatenkota";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";

const KabupatenKotaStore = types
    .model("KabupatenKotaStore", {
        kabupatenkota: types.array(KabupatenKotaModel),
        loading1: types.boolean,
        error1: types.maybeNull(types.string)
    })
    .actions((self) => ({
        getKabupatenKotaData: flow(function* () {
            self.loading1 = true;
            self.error1 = null;
            try {
                const response = yield axiosInstance.get(
                    `${API_BASE_URL}/api/kabupatenkota`,
                );
                self.kabupatenkota = response.data.payload;
            } catch (err) {
                self.error1 = "Failed to fetch complaint types";
            } finally {
                self.loading1 = false;
            }
        })
    }));
export const kabupatenKotaStore = KabupatenKotaStore.create({
    kabupatenkota: [],
    loading1: false,
    error1: null
})