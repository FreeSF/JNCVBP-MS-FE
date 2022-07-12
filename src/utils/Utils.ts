import moment from "moment";

export const startOfDay = (date) => moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate();

export const endOfDay = (date) => moment(date).hours(23).minutes(59).seconds(59).milliseconds(999).toDate();

export const startOfMonth = (month, year) => moment().set({ month, year }).startOf("month").toDate();

export const endOfMonth = (month, year) => moment().set({ month, year }).endOf("month").toDate();
