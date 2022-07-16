import React, { useEffect, useState } from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Select from "react-select";

import { useLazyQuery, useMutation } from "react-apollo";
import {
  GetCoursesDisabledQuery,
  GetDutiesDisabledQuery,
  GetEventsDisabledQuery,
  // GetFireCausesDisabledQuery,
  // GetFireCausesQuery,
  // GetFireClassesDisabledQuery,
  // GetSubTypesDisabledQuery,
  GetGuardsDisabledQuery,
  GetRanksDisabledQuery,
  GetServicesDisabledQuery,
  GetTrainingsDisabledQuery,
  GetUsersDisabledQuery,
  GetVolunteersDisabledQuery,
  RestoreCourseMutation,
} from "../../types";
import { GET_COURSES, GET_COURSES_DISABLED, RESTORE_COURSE } from "../../queries/Courses";
import { GET_VOLUNTEERS_DISABLED } from "../../queries/volunteers";
import { GET_DUTIES_DISABLED } from "../../queries/duties";
import { GET_EVENTS_DISABLED } from "../../queries/events";
// import { GET_FIRE_CAUSES_DISABLED } from "../../queries/fireCause";
// import { GET_FIRE_CLASSES_DISABLED } from "../../queries/fireClass";
// import { GET_SUB_TYPES_DISABLED } from "../../queries/subType";
import { GET_GUARDS_DISABLED } from "../../queries/Guards";
import { GET_RANKS_DISABLED } from "../../queries/ranks";
import { GET_SERVICES, GET_SERVICES_DISABLED } from "../../queries/services";
import { GET_TRAININGS_DISABLED } from "../../queries/Trainings";
import {
  get_course_columns,
  get_duty_columns,
  get_event_columns,
  get_guard_columns,
  get_rank_columns,
  get_training_columns,
  get_users_columns,
  get_volunteer_columns,
} from "utils/columns";
import { GET_USERS_DISABLED } from "../../queries/Users";

const COURSE = "Cursos";
const DUTY = "Tipo de Servicios";
// const FIRE_CAUSE = "Causa de fuego";
// const FIRE_CLASS = "Clase de fuego";
// const SUB_TYPE = "Sub tipo";
const EVENT = "Eventos";
const GUARD = "Guardias";
const USERS = "Usuarios";
const RANK = "Rangos";
const SERVICE = "Servicios";
const TRAINING = "Prácticas";
// const USER = "Usuario";
const VOLUNTEER = "Voluntarios";

const OPTIONS = [
  { value: COURSE, label: COURSE },
  { value: DUTY, label: DUTY },
  // { value: FIRE_CAUSE, label: FIRE_CAUSE },
  // { value: FIRE_CLASS, label: FIRE_CLASS },
  // { value: SUB_TYPE, label: SUB_TYPE },
  { value: EVENT, label: EVENT },
  { value: GUARD, label: GUARD },
  { value: USERS, label: USERS },
  { value: RANK, label: RANK },
  { value: SERVICE, label: SERVICE },
  { value: TRAINING, label: TRAINING },
  // { value: USER, label: USER},
  { value: VOLUNTEER, label: VOLUNTEER },
];

const RecycleBinPage = (props) => {
  const [type, setType] = useState({ value: COURSE, label: COURSE });
  const [loadCourses, courses] = useLazyQuery<GetCoursesDisabledQuery>(GET_COURSES_DISABLED, {
    fetchPolicy: "no-cache",
  });
  const [restoreCourse, restoredCourse] = useMutation<RestoreCourseMutation>(RESTORE_COURSE, {
    fetchPolicy: "no-cache",
  });
  const [loadDuties, duties] = useLazyQuery<GetDutiesDisabledQuery>(GET_DUTIES_DISABLED, { fetchPolicy: "no-cache" });
  const [loadEvents, events] = useLazyQuery<GetEventsDisabledQuery>(GET_EVENTS_DISABLED, { fetchPolicy: "no-cache" });
  // const [loadFireCause, fireCauses] = useLazyQuery<GetFireCausesDisabledQuery>(GET_FIRE_CAUSES_DISABLED, {fetchPolicy: "no-cache"});
  // const [loadFireClass, fireClasses] = useLazyQuery<GetFireClassesDisabledQuery>(GET_FIRE_CLASSES_DISABLED, {fetchPolicy: "no-cache"});
  // const [loadSubType, subTypes] = useLazyQuery<GetSubTypesDisabledQuery>(GET_SUB_TYPES_DISABLED, {fetchPolicy: "no-cache"});
  const [loadGuards, guards] = useLazyQuery<GetGuardsDisabledQuery>(GET_GUARDS_DISABLED, { fetchPolicy: "no-cache" });
  const [loadRanks, ranks] = useLazyQuery<GetRanksDisabledQuery>(GET_RANKS_DISABLED, { fetchPolicy: "no-cache" });
  const [loadServices, services] = useLazyQuery<GetServicesDisabledQuery>(GET_SERVICES_DISABLED, {
    fetchPolicy: "no-cache",
  });
  const [loadTrainings, trainings] = useLazyQuery<GetTrainingsDisabledQuery>(GET_TRAININGS_DISABLED, {
    fetchPolicy: "no-cache",
  });
  const [loadVolunteers, volunteers] = useLazyQuery<GetVolunteersDisabledQuery>(GET_VOLUNTEERS_DISABLED, {
    fetchPolicy: "no-cache",
  });
  const [loadUsers, users] = useLazyQuery<GetUsersDisabledQuery>(GET_USERS_DISABLED, {
    fetchPolicy: "no-cache",
  });

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
      // case FIRE_CAUSE: {
      //   loadFireCause();
      //   break;
      // }
      // case FIRE_CLASS: {
      //   loadFireClass();
      //   break;
      // }
      // case SUB_TYPE: {
      //   loadSubType();
      //   break;
      // }
      case GUARD: {
        loadGuards();
        break;
      }
      case USERS: {
        loadUsers();
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

  const restoreColumn = {
    dataField: "",
    text: "Acciones",
    formatter: (cell, row) => (
      <button
        onClick={() => {
          switch (type.value) {
            case COURSE: {
              restoreCourse({ variables: { id: row.id } }).then(() => loadCourses());
              break;
            }
          }
        }}
      >
        Restaurar
      </button>
    ),
  };

  let columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "Id",
    },
    restoreColumn,
  ];

  let data = [];
  switch (type.value) {
    case COURSE: {
      columns = get_course_columns(restoreColumn);
      data = courses.called && !courses.loading ? courses.data.coursesDisabled : [];
      break;
    }
    case DUTY: {
      columns = get_duty_columns(restoreColumn);
      data = duties.called && !duties.loading ? duties.data.dutiesDisabled : [];
      break;
    }
    case EVENT: {
      columns = get_event_columns(restoreColumn);
      data = events.called && !events.loading ? events.data.eventsDisabled : [];
      break;
    }
    // case FIRE_CAUSE: {
    //   data = fireCauses.called && !fireCauses.loading ? fireCauses.data.fireCausesDisabled : [];
    //   break;
    // }
    // case FIRE_CLASS: {
    //   data = fireClasses.called && !fireClasses.loading ? fireClasses.data.fireClassesDisabled : [];
    //   break;
    // }
    // case SUB_TYPE: {
    //   data = subTypes.called && !subTypes.loading ? subTypes.data.subTypesDisabled : [];
    //   break;
    // }
    case GUARD: {
      columns = get_guard_columns(restoreColumn);
      data = guards.called && !guards.loading ? guards.data.guardsDisabled : [];
      break;
    }
    case USERS: {
      columns = get_users_columns(restoreColumn);
      data = users.called && !users.loading ? users.data.usersDisabled : [];
      break;
    }
    case RANK: {
      columns = get_rank_columns(restoreColumn);
      data = ranks.called && !ranks.loading ? ranks.data.ranksDisabled : [];
      break;
    }
    case SERVICE: {
      data = services.called && !services.loading ? services.data.servicesDisabled : [];
      break;
    }
    case TRAINING: {
      columns = get_training_columns(restoreColumn);
      data = trainings.called && !trainings.loading ? trainings.data.trainingsDisabled : [];
      break;
    }
    case VOLUNTEER: {
      columns = get_volunteer_columns(restoreColumn);
      data = volunteers.called && !volunteers.loading ? volunteers.data.volunteersDisabled : [];
      break;
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                Papelera de Reciclaje
                <div className="pull-right ml-2" style={{ display: "inline-flex" }}>
                  <Select value={type} onChange={setType} options={OPTIONS} />
                </div>
              </Card.Title>
              <p className="cardu-category">({data?.length || 0}) encontrados </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <BootstrapTable keyField="id" data={data} columns={columns} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecycleBinPage;
