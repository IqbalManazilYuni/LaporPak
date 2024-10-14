import { types } from "mobx-state-tree";

export const PenggunaModel = types.model("Pengguna", {
    _id: types.identifier,
    username: types.string,
    name: types.string,
    nomor_hp: types.string,
    password: types.string,
    addres: types.string,
});