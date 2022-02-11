import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {useQuery} from "react-apollo";
import {FindServiceQuery} from "../../types";
import {FIND_SERVICE} from "../../queries/services";
import Spinner from "../spinner";
import {Button} from "react-bootstrap";
import _ from 'lodash';

const ShowServicePage:React.FC<TheProps> = props => {

  const query = useQuery<FindServiceQuery>(FIND_SERVICE, {variables: {id: props.match.params.id}});

  if(query.loading)
    return <Spinner />

  const service = query.data.service;

  return (
    <div>
      <h1>Service Page {props.match.params.id}</h1>
      <label>Descripción:</label>{service.description}
      <br/>
      <label>Voluntarios Presentes:</label>
      {service.volunteers.map(volunteer => (<span key={volunteer.id}>{`${volunteer.name}, `}</span>))}
      <br/>
      <label>Hora de llamada:</label>{service.call_time}
      <br/>
      <label>Hora de Salida:</label>{service.departure_time}
      <br/>
      <label>Hora de Llegada:</label>{service.arrival_time}
      <br/>
      <label>Hora de Retirada:</label>{service.withdrawal_time}
      <br/>
      <label>Localidad:</label>{service.locality}
      <br/>
      <label>Barrio:</label>{service.neighborhood}
      <br/>
      <label>Dirección:</label>{service.address}
      <br/>
      <label>Lugar:</label>{service.place}
      <br/>
      <label>Comunicado por:</label>{service.alerted_by}
      <br/>
      <label>Teléfono:</label>{service.phone}
      <br/>
      <label>Recibido por:</label>{service.received_by}
      <br/>
      <label>Equipo:</label>{service.crew}
      <br/>
      <label>Oficial a cargo:</label>{service.officer_in_charge?.name || '-'}
      <br/>
      <label>Tipo de Fuego:</label>{service.fire_type?.name || '-'}
      <br/>
      <label>Superficie del Local:</label>{service.fire_type_total_surface || '-'}
      <br/>
      <label>Superficie Incendiada:</label>{service.fire_type_burned_surface || '-'}
      <br/>
      <label>Otros, especificar (Tipo de Fuego):</label>{service.fire_type_description || '-'}
      <br/>
      <label>Propietarios Afectados:</label>{service.affected_owner || '-'}
      <br/>
      <label>Propietarios Afectados (Descripción):</label>{service.affected_owner_description || '-'}
      <br/>
      <label>Causas Posibles:</label>{service.possible_cause?.name || '-'}
      <br/>
      <label>Causas Otras (Especificar):</label>{service.possible_cause_other_description || '-'}
      <br/>
      <label>Proporción:</label>{service.magnitude || '-'}
      <br/>
      <label>Destrucción:</label>{service.damage || '-'}
      <br/>
      <Button href={'/services'}>Volver</Button>
    </div>
  )

}

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {

}

export default ShowServicePage;