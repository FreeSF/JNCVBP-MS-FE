import React from "react";
import { useQuery } from "react-apollo";
import { FindGuardQuery } from "../../types";
import { FIND_GUARD } from "../../queries/Guards";
import Spinner from "../spinner";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "../../utils/constants";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ShowGuardPage = (props) => {
  const query = useQuery<FindGuardQuery>(FIND_GUARD, { variables: { id: props.match.params.id } });
  const history = useHistory();

  if (query.loading) return <Spinner />;

  return (
    <div>
      <h1>Guardia</h1>
      <label>id: </label>
      <span>{query.data.guard.id}</span>
      <br />
      <label>Inicio: </label>
      <span>{query.data.guard.start_time ? moment(query.data.guard.start_time).format(DEFAULT_DATE_FORMAT) : ""}</span>
      <br />
      <label>Fin: </label>
      <span>{query.data.guard.end_time ? moment(query.data.guard.end_time).format(DEFAULT_DATE_FORMAT) : ""}</span>
      <br />
      <label>Voluntarios:</label>
      <span>{query.data.guard.volunteers.map((volunteer) => volunteer.name).join(", ")}</span>
      <br />
      <Button onClick={() => history.push("/guards")}>Volver</Button>
    </div>
  );
};

export default ShowGuardPage;
