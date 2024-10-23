import moment from "moment";

export const startOfMonth = (month, year) => moment().set({ month, year }).startOf("month").toDate();

export const endOfMonth = (month, year) => moment().set({ month, year }).endOf("month").toDate();
