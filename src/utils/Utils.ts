import moment from "moment";

export const startOfDay = (date) => moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate();

export const endOfDay = (date) => moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
