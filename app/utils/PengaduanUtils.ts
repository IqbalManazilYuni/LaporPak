import { flow, types } from "mobx-state-tree";
import { ReportModel } from "../models/pengaduan";
import axios from "axios";
import { API_BASE_URL } from "./server";

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
                const response = yield axios.post(`${API_BASE_URL}/api/pengaduan`, newReport, {
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