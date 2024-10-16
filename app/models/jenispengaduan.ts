import { types } from "mobx-state-tree";

export const JenisPengaduanModel = types.model("JenisPengaduan", {
    _id: types.identifier,
    jenisPengaduan: types.optional(types.string, ""),
    value: types.optional(types.string, ""),  // For valueField
    title: types.optional(types.string, ""),  // For labelField
});
