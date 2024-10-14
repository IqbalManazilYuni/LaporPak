import { flow, types } from "mobx-state-tree";
import { PenggunaModel } from "../models/pengguna";
import axios from "axios";

const PenggunaStore = types
    .model("PenggunaStore", {
        penggunas: types.array(PenggunaModel),
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        addPengguna: flow(function* (newPengguna) {
            self.loading = true;
            self.error = null;
            try {
                const response = yield axios.post(
                    "http://10.44.11.218:5000/api/pengguna/register",
                    newPengguna,
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
                const result = response.data;
                if (result.code === 201) {
                    return { success: true, message: "Akun berhasil dibuat!" };
                } else if (result.code === 400) {
                    self.error = result.message;
                    return { success: false, message: result.message };
                }
            } catch (err) {
                if (err.response) {
                    self.error = err.response.data.message || "Gagal membuat akun.";
                    return { success: false, message: self.error };
                } else {
                    self.error = "Gagal membuat akun.";
                    return { success: false, message: "Gagal membuat akun." };
                }
            } finally {
                self.loading = false;
            }
        }),

    }));

export const penggunaStore = PenggunaStore.create({
    penggunas: [],
    loading: false,
    error: null,
});