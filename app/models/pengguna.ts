import { types } from "mobx-state-tree";

export const PenggunaModel = types.model("Pengguna", {
    _id: types.identifier,
    username: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    nomor_hp: types.maybeNull(types.string),
    password: types.maybeNull(types.string),
    addres: types.maybeNull(types.string),
    token: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
});
