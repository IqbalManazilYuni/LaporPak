import { types } from "mobx-state-tree";

export const KabupatenKotaModel = types.model("KabupatenKota", {
    _id: types.identifier,
    kabupatenkota: types.optional(types.string, ""),
    value: types.optional(types.string, ""),  // For valueField
    title: types.optional(types.string, ""),  // For labelField
});
