import { types } from "mobx-state-tree";

export const ReportModel = types.model("Report", {
    _id: types.identifier,
    tanggal: types.optional(types.string, ""),
    pelapor: types.optional(types.string, ""),
    lokasi: types.model({
        latitude: types.optional(types.number, 0),
        longitude: types.optional(types.number, 0),
    }),
    kabupatenkota: types.optional(types.string, ""),
    jenispengaduan: types.optional(types.string, ""),
    judul_pengaduan: types.optional(types.string, ""),
    deskripsi: types.optional(types.string, ""),
    photo: types.maybeNull(
        types.model({
            uri: types.string,
            type: types.string,
            name: types.string,
        })
    ),
});

