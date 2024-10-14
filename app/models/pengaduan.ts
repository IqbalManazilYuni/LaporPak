import { types } from "mobx-state-tree";

export const ReportModel = types.model("Report", {
    id: types.identifier,
    tanggal: types.string,
    pelapor: types.string,
    lokasi: types.string,
    deskripsi: types.string,
    longitude: types.string,  // longitude for location
    latitude: types.string,   // latitude for location
    photo: types.maybeNull(types.string), // URL or path of the uploaded photo
});