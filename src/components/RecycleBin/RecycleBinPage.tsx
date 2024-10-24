import React, { useEffect, useRef, useState } from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColumnDescription } from "react-bootstrap-table-next";
import Select from "react-select";

import { useMutation } from "@apollo/client";
import {
  RestoreCourseMutation,
  RestoreEventMutation,
  RestoreGuardMutation,
  RestoreServiceMutation,
  RestoreTrainingMutation,
  RestoreUserMutation,
  RestoreVolunteerMutation,
} from "../../types";
import { GET_COURSES, GET_PAGINATED_COURSES, RESTORE_COURSE } from "../../queries/Courses";
import { GET_PAGINATED_VOLUNTEERS, RESTORE_VOLUNTEER } from "../../queries/volunteers";
import { GET_EVENTS, GET_PAGINATED_EVENTS, RESTORE_EVENT } from "../../queries/events";
import { GET_PAGINATED_GUARDS, NEXT_GUARD, RESTORE_GUARD } from "../../queries/Guards";
import { GET_PAGINATED_SERVICES, GET_SERVICES, RESTORE_SERVICE } from "../../queries/services";
import { GET_PAGINATED_TRAININGS, GET_TRAININGS, RESTORE_TRAINING } from "../../queries/Trainings";
import {
  get_course_columns,
  get_event_columns,
  get_guard_columns,
  get_service_columns,
  get_training_columns,
  get_users_columns,
  get_volunteer_columns,
} from "utils/columns";
import { GET_PAGINATED_USERS, GET_USERS, RESTORE_USER } from "../../queries/Users";
import PagedTable from "../utils/PagedTable";
import { DocumentNode } from "graphql";

const COURSE = "Cursos";
const EVENT = "Eventos";
const GUARD = "Guardias";
const USERS = "Usuarios";
const SERVICE = "Servicios";
const TRAINING = "Prácticas";
const VOLUNTEER = "Voluntarios";

const OPTIONS = [
  { value: COURSE, label: COURSE },
  { value: EVENT, label: EVENT },
  { value: GUARD, label: GUARD },
  { value: USERS, label: USERS },
  { value: SERVICE, label: SERVICE },
  { value: TRAINING, label: TRAINING },
  { value: VOLUNTEER, label: VOLUNTEER },
];

/**
 * RecycleBinPage component
 *
 * The component renders a dropdown menu with the available options, and a
 * PagedTable component with the deleted records of the selected type.
 * It allows the user to restore each record using the restore button.
 */
const RecycleBinPage = () => {
  const [type, setType] = useState({ value: COURSE, label: COURSE });
  const [restoreCourse] = useMutation<RestoreCourseMutation>(RESTORE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });
  const [restoreEvent] = useMutation<RestoreEventMutation>(RESTORE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });
  const [restoreGuard] = useMutation<RestoreGuardMutation>(RESTORE_GUARD, {
    refetchQueries: [{ query: NEXT_GUARD }],
  });
  const [restoreUser] = useMutation<RestoreUserMutation>(RESTORE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [restoreService] = useMutation<RestoreServiceMutation>(RESTORE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES }],
  });
  const [restoreTraining] = useMutation<RestoreTrainingMutation>(RESTORE_TRAINING, {
    refetchQueries: [{ query: GET_TRAININGS }],
  });
  const [restoreVolunteer] = useMutation<RestoreVolunteerMutation>(RESTORE_VOLUNTEER, {
    refetchQueries: [{ query: GET_PAGINATED_VOLUNTEERS }],
  });
  const refreshTable = useRef(() => {});

  useEffect(() => {
    refreshTable.current();
  }, []);

  const restoreColumn = {
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row) => (
      <Button
        className="btn-fill btn-sm"
        onClick={() => {
          switch (type.value) {
            case COURSE: {
              restoreCourse({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case EVENT: {
              restoreEvent({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case GUARD: {
              restoreGuard({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case USERS: {
              restoreUser({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case SERVICE: {
              restoreService({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case TRAINING: {
              restoreTraining({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case VOLUNTEER: {
              restoreVolunteer({ variables: { id: row.id } }).then(() => refreshTable.current());
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

  let query: DocumentNode;
  switch (type.value) {
    case COURSE: {
      columns = get_course_columns(restoreColumn);
      query = GET_PAGINATED_COURSES;
      break;
    }
    case EVENT: {
      columns = get_event_columns(restoreColumn);
      query = GET_PAGINATED_EVENTS;
      break;
    }
    case GUARD: {
      columns = get_guard_columns(restoreColumn);
      query = GET_PAGINATED_GUARDS;
      break;
    }
    case USERS: {
      columns = get_users_columns(restoreColumn);
      query = GET_PAGINATED_USERS;
      break;
    }
    case SERVICE: {
      columns = get_service_columns(restoreColumn);
      query = GET_PAGINATED_SERVICES;
      break;
    }
    case TRAINING: {
      columns = get_training_columns(restoreColumn);
      query = GET_PAGINATED_TRAININGS;
      break;
    }
    case VOLUNTEER: {
      columns = get_volunteer_columns(restoreColumn);
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
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable
                keyField="id"
                query={query}
                columns={columns}
                disabled={true}
                refreshFunction={refreshTable}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecycleBinPage;
