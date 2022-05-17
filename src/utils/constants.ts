// develop site 'https://jncvbp-ms.herokuapp.com/graphql';

import moment from "moment";

// For Development
export const API_URL = "http://localhost:3000/graphql";

// For Deploy
//export const API_URL = "https://jncvbp-ms.herokuapp.com/graphql";

// Can be moved up to make the constants
export const MODE_CREATE = "CREATE";
export const MODE_EDIT = "EDIT";

export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
export const DEFAULT_DATETIME_FORMAT = "MM/DD/YYYY HH:mm";
// export const API_URL = process.env.JNCVBP_URL || "http://localhost:3000/graphql";

export const BLOOD_TYPES = [
  { id: "Not Set", description: "No definido" },
  { id: "A+", description: "A RH(+)" },
  { id: "A-", description: "A RH(-)" },
  { id: "B+", description: "B RH(+)" },
  { id: "B-", description: "B RH(-)" },
  { id: "AB+", description: "AB RH(+)" },
  { id: "AB-", description: "AB RH(-)" },
  { id: "0+", description: "0 RH(+)" },
  { id: "0-", description: "0 RH(-)" },
];

export const CODES = {
  ACCIDENT: "10.41",
  FIRE: "10.40",
  RESCUE: "10.43",
};

export const VOLUNTEER_STATUS = [
  { id: "Active", description: "Activo" },
  { id: "Inactive", description: "Inactivo" },
  { id: "Deceased", description: "Muerto en combate" },
];

export const get_formatted_volunteers = (volunteers) =>
  volunteers
    .map((volunteer) => volunteer.name)
    .sort((v1, v2) => v1.localeCompare(v2))
    .join(", ");

export const get_volunteer_status = (status_id) => {
  return VOLUNTEER_STATUS.find((status) => status.id == status_id)?.description || "";
};

export const get_blood_type = (blood_type_id) => {
  return BLOOD_TYPES.find((blood_type) => blood_type.id == blood_type_id)?.description || "";
};

export const get_formatted_date = (date) => {
  return date ? moment(date).format(DEFAULT_DATE_FORMAT) : "";
};

export const get_formatted_datetime = (date) => {
  return date ? moment(date).format(DEFAULT_DATETIME_FORMAT) : "";
};

// default data
export const volunteerDefaultValues = {
  name: undefined,
  code: undefined,
  status: "Active",
  blood_type: "Not Set",
  rank: { id: null },
};
