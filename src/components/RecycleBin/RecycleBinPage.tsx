import React, { useEffect, useState } from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Select from "react-select";

import { useLazyQuery, useMutation } from "@apollo/client";
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
  RestoreEventMutation,
  RestoreGuardMutation,
  RestoreRankMutation,
  RestoreServiceMutation,
  RestoreTrainingMutation,
  RestoreUserMutation,
  RestoreVolunteerMutation,
} from "../../types";
import { GET_COURSES, GET_COURSES_DISABLED, GET_PAGINATED_COURSES, RESTORE_COURSE } from "../../queries/Courses";
import {
  GET_PAGINATED_VOLUNTEERS,
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DISABLED,
  RESTORE_VOLUNTEER,
} from "../../queries/volunteers";
import { GET_DUTIES_DISABLED } from "../../queries/duties";
import { GET_EVENTS, GET_EVENTS_DISABLED, GET_PAGINATED_EVENTS, RESTORE_EVENT } from "../../queries/events";
// import { GET_FIRE_CAUSES_DISABLED } from "../../queries/fireCause";
// import { GET_FIRE_CLASSES_DISABLED } from "../../queries/fireClass";
// import { GET_SUB_TYPES_DISABLED } from "../../queries/subType";
import { GET_GUARDS, GET_GUARDS_DISABLED, GET_PAGINATED_GUARDS, RESTORE_GUARD } from "../../queries/Guards";
import { GET_RANKS, GET_RANKS_DISABLED, RESTORE_RANK } from "../../queries/ranks";
import { GET_PAGINATED_SERVICES, GET_SERVICES, GET_SERVICES_DISABLED, RESTORE_SERVICE } from "../../queries/services";
import {
  GET_PAGINATED_TRAININGS,
  GET_TRAININGS,
  GET_TRAININGS_DISABLED,
  RESTORE_TRAINING,
} from "../../queries/Trainings";
import {
  get_course_columns,
  get_duty_columns,
  get_event_columns,
  get_guard_columns,
  get_rank_columns,
  get_service_columns,
  get_training_columns,
  get_users_columns,
  get_volunteer_columns,
} from "utils/columns";
import { GET_PAGINATED_USERS, GET_USERS, GET_USERS_DISABLED, RESTORE_USER } from "../../queries/Users";
import StandardTable from "../utils/standardTable";
import PagedTable from "../utils/PagedTable";
import { DocumentNode } from "graphql";
import { tr } from "date-fns/locale";

const COURSE = "Cursos";
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
  // { value: FIRE_CAUSE, label: FIRE_CAUSE },
  // { value: FIRE_CLASS, label: FIRE_CLASS },
  // { value: SUB_TYPE, label: SUB_TYPE },
  { value: EVENT, label: EVENT },
  { value: GUARD, label: GUARD },
  { value: USERS, label: USERS },
  //{ value: RANK, label: RANK },
  { value: SERVICE, label: SERVICE },
  { value: TRAINING, label: TRAINING },
  // { value: USER, label: USER},
  { value: VOLUNTEER, label: VOLUNTEER },
];

const RecycleBinPage = (props) => {
  const [type, setType] = useState({ value: COURSE, label: COURSE });
  const [loadCourses, courses] = useLazyQuery<GetCoursesDisabledQuery>(GET_COURSES_DISABLED);
  const [restoreCourse, restoredCourse] = useMutation<RestoreCourseMutation>(RESTORE_COURSE, {
    refetchQueries: [{ query: GET_COURSES_DISABLED }, { query: GET_COURSES }],
  });
  const [restoreEvent, restoredEvent] = useMutation<RestoreEventMutation>(RESTORE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS_DISABLED }, { query: GET_EVENTS }],
  });
  const [restoreGuard, restoredGuard] = useMutation<RestoreGuardMutation>(RESTORE_GUARD, {
    refetchQueries: [{ query: GET_GUARDS_DISABLED }, { query: GET_GUARDS }],
  });
  const [restoreUser, restoredUser] = useMutation<RestoreUserMutation>(RESTORE_USER, {
    refetchQueries: [{ query: GET_USERS_DISABLED }, { query: GET_USERS }],
  });
  const [restoreRank, restoredRank] = useMutation<RestoreRankMutation>(RESTORE_RANK, {
    refetchQueries: [{ query: GET_RANKS_DISABLED }, { query: GET_RANKS }],
  });
  const [restoreService, restoredService] = useMutation<RestoreServiceMutation>(RESTORE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES_DISABLED }, { query: GET_SERVICES }],
  });
  const [restoreTraining, restoredTraining] = useMutation<RestoreTrainingMutation>(RESTORE_TRAINING, {
    refetchQueries: [{ query: GET_TRAININGS_DISABLED }, { query: GET_TRAININGS }],
  });
  const [restoreVolunteer, restoredVolunteer] = useMutation<RestoreVolunteerMutation>(RESTORE_VOLUNTEER, {
    refetchQueries: [{ query: GET_VOLUNTEERS_DISABLED }, { query: GET_VOLUNTEERS }],
  });
  const [loadEvents, events] = useLazyQuery<GetEventsDisabledQuery>(GET_EVENTS_DISABLED);
  // const [loadFireCause, fireCauses] = useLazyQuery<GetFireCausesDisabledQuery>(GET_FIRE_CAUSES_DISABLED, {fetchPolicy: "no-cache"});
  // const [loadFireClass, fireClasses] = useLazyQuery<GetFireClassesDisabledQuery>(GET_FIRE_CLASSES_DISABLED, {fetchPolicy: "no-cache"});
  // const [loadSubType, subTypes] = useLazyQuery<GetSubTypesDisabledQuery>(GET_SUB_TYPES_DISABLED, {fetchPolicy: "no-cache"});
  const [loadGuards, guards] = useLazyQuery<GetGuardsDisabledQuery>(GET_GUARDS_DISABLED);
  const [loadRanks, ranks] = useLazyQuery<GetRanksDisabledQuery>(GET_RANKS_DISABLED);
  const [loadServices, services] = useLazyQuery<GetServicesDisabledQuery>(GET_SERVICES_DISABLED);
  const [loadTrainings, trainings] = useLazyQuery<GetTrainingsDisabledQuery>(GET_TRAININGS_DISABLED);
  const [loadVolunteers, volunteers] = useLazyQuery<GetVolunteersDisabledQuery>(GET_VOLUNTEERS_DISABLED);
  const [loadUsers, users] = useLazyQuery<GetUsersDisabledQuery>(GET_USERS_DISABLED);

  useEffect(() => {
    switch (type.value) {
      case COURSE: {
        loadCourses();
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
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row) => (
      <Button
        className="btn-fill btn-sm"
        onClick={() => {
          switch (type.value) {
            case COURSE: {
              restoreCourse({ variables: { id: row.id } });
              break;
            }
            case EVENT: {
              restoreEvent({ variables: { id: row.id } });
              break;
            }
            case GUARD: {
              restoreGuard({ variables: { id: row.id } });
              break;
            }
            case USERS: {
              restoreUser({ variables: { id: row.id } });
              break;
            }
            /*case RANK: {
              restoreRank({ variables: { id: row.id } });
              break;
            }*/
            case SERVICE: {
              restoreService({ variables: { id: row.id } });
              break;
            }
            case TRAINING: {
              restoreTraining({ variables: { id: row.id } });
              break;
            }
            case VOLUNTEER: {
              restoreVolunteer({ variables: { id: row.id } });
              break;
            }
          }
        }}
      >
        Restaurar
      </Button>
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
  let query: DocumentNode;
  switch (type.value) {
    case COURSE: {
      columns = get_course_columns(restoreColumn);
      data = courses.called && !courses.loading ? courses.data.coursesDisabled : [];
      query = GET_PAGINATED_COURSES;
      break;
    }
    case EVENT: {
      columns = get_event_columns(restoreColumn);
      data = events.called && !events.loading ? events.data.eventsDisabled : [];
      query = GET_PAGINATED_EVENTS;
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
      query = GET_PAGINATED_GUARDS;
      break;
    }
    case USERS: {
      columns = get_users_columns(restoreColumn);
      data = users.called && !users.loading ? users.data.usersDisabled : [];
      query = GET_PAGINATED_USERS;
      break;
    }
    /*case RANK: {
      columns = get_rank_columns(restoreColumn);
      data = ranks.called && !ranks.loading ? ranks.data.ranksDisabled : [];
      break;
    }*/
    case SERVICE: {
      columns = get_service_columns(restoreColumn);
      data = services.called && !services.loading ? services.data.servicesDisabled : [];
      query = GET_PAGINATED_SERVICES;
      break;
    }
    case TRAINING: {
      columns = get_training_columns(restoreColumn);
      data = trainings.called && !trainings.loading ? trainings.data.trainingsDisabled : [];
      query = GET_PAGINATED_TRAININGS;
      break;
    }
    case VOLUNTEER: {
      columns = get_volunteer_columns(restoreColumn);
      data = volunteers.called && !volunteers.loading ? volunteers.data.volunteersDisabled : [];
      query = GET_PAGINATED_VOLUNTEERS;
      break;
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title>
                <span className="h4">Papelera de Reciclaje</span>
                <div className="pull-right ml-2" style={{ display: "inline-flex" }}>
                  <Select value={type} onChange={setType} options={OPTIONS} />
                </div>
              </Card.Title>
              <p className="cardu-category">({data?.length || 0}) encontrados </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable keyField="id" query={query} columns={columns} disabled={true} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecycleBinPage;
