import { gql } from "apollo-boost";
import { USER_ALL_FIELDS_FRAGMENT } from "./Users";

/**
 * Events-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Event" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

const EVENT_ALL_FIELDS_FRAGMENT = gql`
  fragment eventAllFields on Event {
    id
    description
    createdAt
    created_by {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const GET_EVENTS = gql`
  query getEvents {
    events {
      ...eventAllFields
    }
  }
  ${EVENT_ALL_FIELDS_FRAGMENT}
`;

export const GET_PAGINATED_EVENTS = gql`
  query getPaginatedEvents(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedEvents(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...eventAllFields
      }
      totalSize
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
