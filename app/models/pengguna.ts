import { types } from "mobx-state-tree";

export const PenggunaModel = types.model("Pengguna", {
    _id: types.identifier,
    username: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    nomor_hp: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    addres: types.optional(types.string, ""),
    token: types.optional(types.string, ""),
    role: types.optional(types.string, ""),
});
