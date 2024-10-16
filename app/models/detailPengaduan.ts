import { types } from "mobx-state-tree";

export const DetailPengaduanModels = types.model("DetailPengaduan", {
    _id: types.identifier,
    index: types.optional(types.string, ""),
    judul: types.optional(types.string, ""),
    deskripsi: types.optional(types.string, ""),
    nama_pelapor: types.optional(types.string, ""),
    tanggal: types.optional(types.string, ""),
    jenis_pengaduan: types.optional(types.string, ""),
    kabupatenkota: types.optional(types.string, ""),
    lokasi: types.optional(types.string, ""),
    uri_foto: types.optional(types.string, ""),
    status: types.maybeNull(types.string),
    petugas: types.maybeNull(types.string),
});
