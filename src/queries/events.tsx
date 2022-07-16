import { gql } from "apollo-boost";
import { volunteerAllFieldsFragment } from "./volunteers";

const EVENT_ALL_FIELDS_FRAGMENT = gql`
  fragment eventAllFields on Event {
    id
    description
    created_by {
      ...volunteerAllFields
    }
  }
  ${volunteerAllFieldsFragment}
`;

export const GET_EVENTS = gql`
  query getEvents {
    events {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const GET_EVENTS_DISABLED = gql`
  query getEventsDisabled {
    eventsDisabled {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const FIND_EVENT = gql`
  query findEvent($id: String!) {
    event(id: $id) {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const EDIT_EVENT = gql`
  mutation editEvent($input: UpdateEventInput!) {
    updateEvent(updateEventInput: $input) {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const CREATE_EVENT = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(createEventInput: $input) {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($id: String!) {
    removeEvent(id: $id) {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const RESTORE_EVENT = gql`
  mutation restoreEvent($id: String!) {
    restoreEvent(id: $id) {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;
