import moment from "moment";
import { ColumnDescription } from "react-bootstrap-table-next";
import {
  GuardAllFieldsFragment,
  TrainingAllFieldsFragment,
  UserAllFieldsFragment,
  Volunteer,
  VolunteerAllFieldsFragment,
} from "types";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  get_blood_type,
  get_formatted_date,
  get_formatted_datetime,
  get_formatted_volunteers,
  get_volunteer_status,
} from "./constants";

export const get_course_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "description", text: "Descripción" },
    { dataField: "date", text: "Fecha", formatter: (cell, row) => get_formatted_date(cell) },
    options,
  ];

  return columns;
};

export const get_duty_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "description", text: "Descripción" },
    {
      dataField: "date",
      text: "Fecha",
      formatter: (cell, row) => (cell ? moment(cell).format(DEFAULT_DATE_FORMAT) : ""),
    },
    options,
  ];

  return columns;
};

export const get_event_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "createdAt", text: "Fecha", formatter: (cell, row) => moment(cell).format(DEFAULT_DATETIME_FORMAT) },
    { dataField: "description", text: "Descripción" },
    { dataField: "created_by", text: "Creado por", formatter: (cell, row) => `${cell?.firstName} ${cell?.lastName}` },
    options,
  ];

  return columns;
};

export const get_guard_columns = (options) => {
  const columns: ColumnDescription[] = [
    {
      dataField: "start_time",
      text: "Inicio",
      formatter: (cell, row: GuardAllFieldsFragment) => get_formatted_datetime(row.start_time),
    },
    {
      dataField: "end_time",
      text: "Fin",
      formatter: (cell, row: GuardAllFieldsFragment) => get_formatted_datetime(row.end_time),
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: VolunteerAllFieldsFragment[]) => get_formatted_volunteers(cell),
    },
    {
      dataField: "observations",
      text: "Observaciones",
    },
    options,
  ];

  return columns;
};

export const get_users_columns = (options) => {
  const columns: ColumnDescription[] = [
    {
      dataField: "username",
      text: "Usuario",
    },
    {
      dataField: "firstName",
      text: "Nombre",
    },
    {
      dataField: "lastName",
      text: "Apellido",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "admin",
      text: "Rol",
      formatter: (cell, row: UserAllFieldsFragment) => (row?.isAdmin ? "Administrador" : "Usuario"),
    },
    options,
  ];

  return columns;
};

export const get_service_columns = (options) => {
  const columns: ColumnDescription[] = [
    {
      dataField: "date",
      text: "Fecha",
      formatter: (cell, row) => moment(cell).format(DEFAULT_DATETIME_FORMAT),
    },
    {
      dataField: "officer_in_charge.name",
      text: "Oficial",
    },
    {
      dataField: "locality",
      text: "Localidad",
    },
    {
      dataField: "sub_type.code",
      text: "Código",
    },
    {
      dataField: "sub_type.name",
      text: "Sub Tipo",
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: Volunteer[]) => cell.map((volunteer) => volunteer.name).join(","),
    },
    options,
  ];

  return columns;
};

export const get_rank_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "name", text: "Nombre" },
    { dataField: "description", text: "Descripción" },
    options,
  ];

  return columns;
};

export const get_training_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "description", text: "Descripción" },
    {
      dataField: "date",
      text: "Fecha",
      formatter: (cell, row: TrainingAllFieldsFragment) => get_formatted_date(row.date),
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: VolunteerAllFieldsFragment[]) => get_formatted_volunteers(cell),
    },
    options,
  ];

  return columns;
};

export const get_volunteer_columns = (options) => {
  const columns: ColumnDescription[] = [
    { dataField: "code", text: "Código" },
    { dataField: "name", text: "Nombre" },
    {
      dataField: "status",
      text: "Estado",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_volunteer_status(row.status),
    },
    {
      dataField: "blood_type",
      text: "Grupo Sanguíneo",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_blood_type(row.blood_type),
    },
    { dataField: "rank.name", text: "Rango" },
    {
      dataField: "incorporation_date",
      text: "Fecha de Reclutamiento",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_formatted_date(row.incorporation_date),
    },
    options,
  ];

  return columns;
};
