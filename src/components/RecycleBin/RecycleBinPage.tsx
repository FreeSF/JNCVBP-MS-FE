import React, { useEffect, useState } from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Select from "react-select";
import { useLazyQuery } from "react-apollo";
import {
  GetCoursesDisabledQuery,
  GetDutiesDisabledQuery,
  GetEventsDisabledQuery,
  GetFireCausesDisabledQuery,
  GetFireCausesQuery,
  GetFireClassesDisabledQuery,
  GetFireTypesDisabledQuery,
  GetGuardsDisabledQuery,
  GetRanksDisabledQuery,
  GetServicesDisabledQuery,
  GetTrainingsDisabledQuery,
  GetVolunteersDisabledQuery,
} from "../../types";
import { GET_COURSES_DISABLED } from "../../queries/Courses";
import { useQuery } from "react-apollo";
import { GET_VOLUNTEERS, GET_VOLUNTEERS_DISABLED } from "../../queries/volunteers";
import { GET_DUTIES_DISABLED } from "../../queries/duties";
import { GET_EVENTS_DISABLED } from "../../queries/Events";
import { GET_FIRE_CAUSES_DISABLED } from "../../queries/fireCause";
import { GET_FIRE_CLASSES_DISABLED } from "../../queries/fireClass";
import { GET_FIRE_TYPES_DISABLED } from "../../queries/fireType";
import { GET_GUARDS_DISABLED } from "../../queries/Guards";
import { GET_RANKS_DISABLED } from "../../queries/ranks";
import { GET_SERVICES_DISABLED } from "../../queries/services";
import { GET_TRAININGS_DISABLED } from "../../queries/Trainings";

const COURSE = "Curso";
const DUTY = "duty";
const FIRE_CAUSE = "Causa de fuego";
const FIRE_CLASS = "Clase de fuego";
const FIRE_TYPE = "Tipo de fuego";
const EVENT = "Evento";
const GUARD = "Guardia";
const RANK = "Rango";
const SERVICE = "Servicio";
const TRAINING = "Práctica";
const USER = "Usuario";
const VOLUNTEER = "Voluntario";

const OPTIONS = [
  {
    value: COURSE,
    label: COURSE,
  },
  {
    value: DUTY,
    label: DUTY,
  },
  {
    value: FIRE_CAUSE,
    label: FIRE_CAUSE,
  },
  {
    value: FIRE_CLASS,
    label: FIRE_CLASS,
  },
  {
    value: FIRE_TYPE,
    label: FIRE_TYPE,
  },
  {
    value: EVENT,
    label: EVENT,
  },
  {
    value: GUARD,
    label: GUARD,
  },
  {
    value: RANK,
    label: RANK,
  },
  {
    value: SERVICE,
    label: SERVICE,
  },
  {
    value: TRAINING,
    label: TRAINING,
  },
  {
    value: USER,
    label: USER,
  },
  {
    value: VOLUNTEER,
    label: VOLUNTEER,
  },
];

const RecycleBinPage = (props) => {
  const [type, setType] = useState({ value: COURSE, label: COURSE });
  const [loadCourses, courses] = useLazyQuery<GetCoursesDisabledQuery>(GET_COURSES_DISABLED, {});
  const [loadDuties, duties] = useLazyQuery<GetDutiesDisabledQuery>(GET_DUTIES_DISABLED, {});
  const [loadEvents, events] = useLazyQuery<GetEventsDisabledQuery>(GET_EVENTS_DISABLED, {});
  const [loadFireCause, fireCauses] = useLazyQuery<GetFireCausesDisabledQuery>(GET_FIRE_CAUSES_DISABLED, {});
  const [loadFireClass, fireClasses] = useLazyQuery<GetFireClassesDisabledQuery>(GET_FIRE_CLASSES_DISABLED, {});
  const [loadFireType, fireTypes] = useLazyQuery<GetFireTypesDisabledQuery>(GET_FIRE_TYPES_DISABLED, {});
  const [loadGuards, guards] = useLazyQuery<GetGuardsDisabledQuery>(GET_GUARDS_DISABLED, {});
  const [loadRanks, ranks] = useLazyQuery<GetRanksDisabledQuery>(GET_RANKS_DISABLED, {});
  const [loadServices, services] = useLazyQuery<GetServicesDisabledQuery>(GET_SERVICES_DISABLED, {});
  const [loadTrainings, trainings] = useLazyQuery<GetTrainingsDisabledQuery>(GET_TRAININGS_DISABLED, {});
  const [loadVolunteers, volunteers] = useLazyQuery<GetVolunteersDisabledQuery>(GET_VOLUNTEERS_DISABLED, {});

  useEffect(() => {
    switch (type.value) {
      case COURSE: {
        loadCourses();
        break;
      }
      case DUTY: {
        loadDuties();
        break;
      }
      case EVENT: {
        loadEvents();
        break;
      }
      case FIRE_CAUSE: {
        loadFireCause();
        break;
      }
      case FIRE_CLASS: {
        loadFireClass();
        break;
      }
      case FIRE_TYPE: {
        loadFireType();
        break;
      }
      case GUARD: {
        loadGuards();
        break;
      }
      case RANK: {
        loadRanks();
        break;
      }
      case SERVICE: {
        loadServices();
        break;
      }
      case TRAINING: {
        loadTrainings();
        break;
      }
      case VOLUNTEER: {
        loadVolunteers();
        break;
      }
    }
  }, [type]);

  const columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "",
      text: "",
      formatter: (cell, row) => <button>Restaurar</button>,
    },
  ];

  let data = [];

  switch (type.value) {
    case COURSE: {
      data = courses.called && !courses.loading ? courses.data.coursesDisabled : [];
      break;
    }
    case DUTY: {
      data = duties.called && !duties.loading ? duties.data.dutiesDisabled : [];
      break;
    }
    case EVENT: {
      data = events.called && !events.loading ? events.data.eventsDisabled : [];
      break;
    }
    case FIRE_CAUSE: {
      data = fireCauses.called && !fireCauses.loading ? fireCauses.data.fireCausesDisabled : [];
      break;
    }
    case FIRE_CLASS: {
      data = fireClasses.called && !fireClasses.loading ? fireClasses.data.fireClassesDisabled : [];
      break;
    }
    case FIRE_TYPE: {
      data = fireTypes.called && !fireTypes.loading ? fireTypes.data.fireTypesDisabled : [];
      break;
    }
    case GUARD: {
      data = guards.called && !guards.loading ? guards.data.guardsDisabled : [];
      break;
    }
    case RANK: {
      data = ranks.called && !ranks.loading ? ranks.data.ranksDisabled : [];
      break;
    }
    case SERVICE: {
      data = services.called && !services.loading ? services.data.servicesDisabled : [];
      break;
    }
    case TRAINING: {
      data = trainings.called && !trainings.loading ? trainings.data.trainingsDisabled : [];
      break;
    }
    case VOLUNTEER: {
      data = volunteers.called && !volunteers.loading ? volunteers.data.volunteersDisabled : [];
      break;
    }
  }

  return (
    <div>
      <h1>Recycle Bin</h1>
      <Select value={type} onChange={setType} options={OPTIONS} />
      <BootstrapTable keyField="id" data={data} columns={columns} />
    </div>
  );
};

export default RecycleBinPage;
