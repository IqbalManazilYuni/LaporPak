import { flow, types } from "mobx-state-tree";
import { PenggunaModel } from "../models/pengguna";
import axios from "axios";
import axiosInstance from "./axiosInterceptors";
import { API_BASE_URL } from "./server";

const PenggunaStore = types
    .model("PenggunaStore", {
        penggunas: types.array(PenggunaModel),
        loading: types.boolean,
        error: types.maybeNull(types.string),
        currentUser: types.maybeNull(PenggunaModel),
    })
    .actions((self) => ({
        addPengguna: flow(function* (newPengguna) {
            self.loading = true;
            self.error = null;
            try {
                const response = yield axios.post(
                    `${API_BASE_URL}/api/pengguna/register`,
                    newPengguna,
                    { headers: { "Content-Type": "application/json" } }
                );
                const result = response.data;
                if (result.code === 201) {
                    return { success: true, message: "Akun berhasil dibuat!" };
                } else {
                    self.error = result.message;
                    return { success: false, message: result.message };
                }
            } catch (err) {
                self.error = err.response?.data.message || "Gagal membuat akun.";
                return { success: false, message: self.error };
            } finally {
                self.loading = false;
            }
        }),

        loginPengguna: flow(function* (credentials: { username: string; password: string }) {
            self.loading = true;
            self.error = null;
            try {
                const response = yield axios.post(
                    `${API_BASE_URL}/api/pengguna/login`,
                    credentials,
                    { headers: { "Content-Type": "application/json" } }
                );
                const result = response.data;
                if (result.code === 200) {
                    const pengguna = result.pengguna;
                    pengguna.token = result.token;
                    self.currentUser = pengguna;
                    return { success: true, message: result.message };
                } else {
                    self.error = result.message;
                    return { success: false, message: result.message };
                }
            } catch (err) {
                self.error = err.response?.data.message || "Gagal login.";
                console.log(err);

                return { success: false, message: self.error };
            } finally {
                self.loading = false;
            }
        }),

        logout: () => {
            self.currentUser = null;
            delete axiosInstance.defaults.headers.Authorization;
        },


    }));

export const penggunaStore = PenggunaStore.create({
    penggunas: [],
    loading: false,
    error: null,
    currentUser: null,
});