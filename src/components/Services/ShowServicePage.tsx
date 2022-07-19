import React from "react";
import { useQuery } from "react-apollo";
import { FindServiceQuery } from "../../types";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";
import { FIND_SERVICE } from "../../queries/services";
import { BlobProvider } from "@react-pdf/renderer";
import SingleServiceReport from "../../reports/SingleServiceReport";
import { Button } from "react-bootstrap";
import moment from "moment";
import {
  AFFECTED_OWNER_OPTIONS,
  CODES,
  DAMAGE_1041_OPTIONS,
  DAMAGE_OPTIONS,
  DEFAULT_DATE_FORMAT,
  INVOLVED_ELEMENTS_OPTIONS,
  MAGNITUDE_1041_OPTIONS,
  QUANTITIES_1044_1045_OPTIONS,
  RESCUE_TYPE_OPTIONS,
  RESOURCES_OPTIONS,
} from "../../utils/constants";

const ShowServicePage = (props) => {
  const query = useQuery<FindServiceQuery>(FIND_SERVICE, { variables: { id: props.match.params.id } });
  const history = useHistory();

  if (query.loading) return <Spinner />;

  const { service } = query.data;

  return (
    <div className="card">
      <div className="card-header d-flex">
        <h4 className="card-title">Servicio</h4>
        <Button
          className="btn-fill btn-sm"
          href={`/services/${props.match.params.id}/edit`}
          variant="success"
          style={{ marginLeft: "10px" }}
        >
          Editar
        </Button>
        <BlobProvider document={<SingleServiceReport service={service} />}>
          {({ url }) => (
            <Button
              href={url}
              target="_blank"
              className="btn-fill btn-sm"
              variant="info"
              style={{ marginLeft: "10px" }}
            >
              PDF
            </Button>
          )}
        </BlobProvider>
      </div>

      <div className="card-body">
        <label>Tipo:</label>
        <p>{`${service.sub_type.code} ${service.sub_type.name}`}</p>
        <label>Oficial a cargo:</label>
        <p>{service.officer_in_charge.name}</p>
        <label>Fecha:</label>
        <p>{moment(service.date).format(DEFAULT_DATE_FORMAT)}</p>
        <label>Hora de llamada:</label>
        <p>{service.call_time}</p>
        <label>Hora de salida:</label>
        <p>{service.departure_time}</p>
        <label>Hora de llegada:</label>
        <p>{service.arrival_time}</p>
        <label>Hora de retirada:</label>
        <p>{service.withdrawal_time}</p>
        <label>Localidad:</label>
        <p>{service.locality}</p>
        <label>Barrio:</label>
        <p>{service.neighborhood}</p>
        <label>Dirección:</label>
        <p>{service.address}</p>
        <label>Lugar:</label>
        <p>{service.place}</p>
        <label>Comunicado por:</label>
        <p>{service.alerted_by}</p>
        <label>Teléfono:</label>
        <p>{service.phone}</p>
        <label>Recibido por:</label>
        <p>{service.received_by}</p>
        <label>Equipo:</label>
        <p>{service.crew}</p>
        <label>Mayor problema / Otros datos de interés:</label>
        <p>{service.description}</p>
        <label>Asistencia de Voluntarios:</label>
        <p>{service.volunteers.map((volunteer) => volunteer.name).join(", ")}</p>
        {service.sub_type.code === CODES.FIRE}

        {(service.sub_type.code === CODES.FIRE || service.sub_type.code === CODES.ACCIDENT) && (
          <React.Fragment>
            <label>Recursos Utilizados:</label>
            <p>
              {service.resources_used
                .map(
                  (resource) =>
                    `${
                      RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name || resource.resource
                    }: ${resource.quantity}`
                )
                .join(", ")}
            </p>
          </React.Fragment>
        )}

        {(service.sub_type.code === CODES.RESCUE || service.sub_type.code === CODES.ACCIDENT) && (
          <React.Fragment>
            <label>Cantidad 10.44:</label>
            <p>
              {service.quantities1044
                .map(
                  (element) =>
                    `${QUANTITIES_1044_1045_OPTIONS.find((item) => item.id === element.name)?.name || element.name}: ${
                      element.quantity
                    }`
                )
                .join(", ")}
            </p>
          </React.Fragment>
        )}

        {/* Fire */}
        {service.sub_type.code === CODES.FIRE && (
          <React.Fragment>
            <label>Tipo de fuego (otro):</label>
            <p>{service.fire_type_description}</p>
            <label>Superficie Total:</label>
            <p>{service.fire_type_total_surface}</p>
            <label>Superficie Quemada:</label>
            <p>{service.fire_type_burned_surface}</p>
            <label>Causa Posible:</label>
            <p>{service.possible_cause.name}</p>
            <label>Causa Posible (otro):</label>
            <p>{service.possible_cause_other_description}</p>
            <label>Proporción:</label>
            <p>{service.magnitude}</p>
            <label>Destrucción:</label>
            <p>{DAMAGE_OPTIONS.find((damage) => damage.id === service.damage)?.name || service.damage}</p>
            <label>Vehículos Utilizados:</label>
            <p>{service.vehicles_used}</p>
            <label>Otras unidades de Apoyo:</label>
            <p>{service.other_units}</p>
            <label>Otras Ocurrencias:</label>
            <p>{service.other_occurrences}</p>
            <label>Fuerzas Policiales a cargo:</label>
            <p>{service.police_force_in_charge}</p>
            <label>Juzgado de Crimen oficiado por:</label>
            <p>{service.judge_in_charge}</p>
            <label>Propietarios Afectados:</label>
            <p>
              {AFFECTED_OWNER_OPTIONS.find((owner) => owner.id === service.affected_owner)?.name ||
                service.affected_owner}
            </p>
            <label>Propietarios Afectados (descripción):</label>
            <p>{service.affected_owner_description}</p>
            <label>Fuego Clase:</label>
            <p>{service.fire_class.map((fireClass) => fireClass.name).join(", ")}</p>
          </React.Fragment>
        )}

        {/* Accident */}
        {service.sub_type.code === CODES.ACCIDENT && (
          <React.Fragment>
            <label>Daños:</label>
            <p>
              {service.damage1041
                .map((damage) => DAMAGE_1041_OPTIONS.find((item) => item.id === damage)?.name || damage)
                .join(", ")}
            </p>
            <label>Involucrados:</label>
            <p>
              {service.involved_elements
                .map((element) => INVOLVED_ELEMENTS_OPTIONS.find((item) => item.id === element)?.name || element)
                .join(", ")}
            </p>
            <label>Magnitudes:</label>
            <p>
              {service.magnitude1041
                .map((magnitude) => MAGNITUDE_1041_OPTIONS.find((item) => item.id === magnitude)?.name || magnitude)
                .join(", ")}
            </p>
          </React.Fragment>
        )}

        {/* Rescue */}

        {service.sub_type.code === CODES.RESCUE && (
          <React.Fragment>
            <label>Tipo de Rescate:</label>
            <p>{RESCUE_TYPE_OPTIONS.find((item) => item.id === service.rescue_type)?.name || service.rescue_type}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ShowServicePage;
