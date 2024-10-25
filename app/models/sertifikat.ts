import { types } from "mobx-state-tree";

export const SertifikatModels = types.model("Sertifikat", {
    _id: types.identifier,
    index: types.optional(types.string, ""),
    nama_pelapor: types.optional(types.string, ""),
    createdAt: types.optional(types.string, ""),
    nama_sertifikat: types.optional(types.string, ""),
    uri_pdf: types.optional(types.string, ""),
    status_notif: types.optional(types.string, ""),
    uri_thumbnail: types.optional(types.string, ""),
});
