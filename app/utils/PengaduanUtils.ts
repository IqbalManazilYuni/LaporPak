import { flow, types } from "mobx-state-tree";
import { ReportModel } from "../models/pengaduan";
import axios from "axios";

const ReportStore = types
    .model("ReportStore", {
        reports: types.array(ReportModel),
        loading: types.boolean,
        error: types.maybeNull(types.string),
    })
    .actions((self) => ({
        addReport: flow(function* (newReport) {
            self.loading = true;
            self.error = null;
            try {
                const formData = new FormData();
                formData.append("tanggal", newReport.tanggal);
                formData.append("pelapor", newReport.pelapor);
                formData.append("lokasi", newReport.lokasi);
                formData.append("deskripsi", newReport.deskripsi);
                formData.append("longitude", newReport.longitude);
                formData.append("latitude", newReport.latitude);
                if (newReport.photo) {
                    formData.append("photo", {
                        uri: newReport.photo,
                        type: "image/jpeg",
                        name: "report-photo.jpg",
                    });
                }
                const response = yield axios.post("https://api.example.com/reports", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                const createdReport = response.data;
                self.reports.push(createdReport);
            } catch (err) {
                self.error = "Failed to add report";
            } finally {
                self.loading = false;
            }
        }),
    }));

export const reportStore = ReportStore.create({
    reports: [],
    loading: false,
    error: null,
});