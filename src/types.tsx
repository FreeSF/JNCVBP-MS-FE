import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type AccessToken = {
  __typename?: "AccessToken";
  access_token?: Maybe<Scalars["String"]>;
};

export type Course = {
  __typename?: "Course";
  id: Scalars["String"];
  description: Scalars["String"];
  date: Scalars["DateTime"];
  details?: Maybe<Array<CourseDetail>>;
};

export type CourseDetail = {
  __typename?: "CourseDetail";
  score: Scalars["String"];
  volunteer?: Maybe<Volunteer>;
};

export type CreateCourseInput = {
  description: Scalars["String"];
  date: Scalars["DateTime"];
  details: Array<CourseDetailInput>;
};

export type CreateDutyInput = {
  name: Scalars["String"];
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

export type CreateEventInput = {
  description: Scalars["String"];
  created_by?: Maybe<OnlyIdVolunteerInput>;
};

export type CreateFireCauseInput = {
  name: Scalars["String"];
};

export type CreateFireClassInput = {
  name: Scalars["String"];
};

export type CreateGuardInput = {
  start_time: Scalars["Timestamp"];
  end_time: Scalars["Timestamp"];
  volunteers: Array<OnlyIdVolunteerInput>;
};

export type CreateRankInput = {
  name: Scalars["String"];
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

export type CreateServiceInput = {
  type: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  volunteers?: Maybe<Array<OnlyIdVolunteerInput>>;
  date: Scalars["DateTime"];
  call_time?: Maybe<Scalars["String"]>;
  departure_time?: Maybe<Scalars["String"]>;
  arrival_time?: Maybe<Scalars["String"]>;
  withdrawal_time?: Maybe<Scalars["String"]>;
  locality?: Maybe<Scalars["String"]>;
  neighborhood?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  place?: Maybe<Scalars["String"]>;
  alerted_by?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  received_by?: Maybe<Scalars["String"]>;
  crew?: Maybe<Scalars["String"]>;
  officer_in_charge?: Maybe<OnlyIdVolunteerInput>;
  sub_type?: Maybe<OnlyIdSubTypeInput>;
  fire_type_total_surface?: Maybe<Scalars["Float"]>;
  fire_type_burned_surface?: Maybe<Scalars["Float"]>;
  fire_type_description?: Maybe<Scalars["String"]>;
  affected_owner?: Maybe<Scalars["String"]>;
  affected_owner_description?: Maybe<Scalars["String"]>;
  possible_cause?: Maybe<OnlyIdFireClassInput>;
  possible_cause_other_description?: Maybe<Scalars["String"]>;
  fire_class?: Maybe<Array<OnlyIdFireClassInput>>;
  magnitude?: Maybe<Scalars["String"]>;
  damage?: Maybe<Scalars["String"]>;
  vehicles_used?: Maybe<Scalars["String"]>;
  other_units?: Maybe<Scalars["String"]>;
  other_occurrences?: Maybe<Scalars["String"]>;
  police_force_in_charge?: Maybe<Scalars["String"]>;
  judge_in_charge?: Maybe<Scalars["String"]>;
  damage1041?: Maybe<Array<Scalars["String"]>>;
  quantities1044?: Maybe<Array<Quantity1044Input>>;
  involved_elements?: Maybe<Array<Scalars["String"]>>;
  magnitude1041?: Maybe<Array<Scalars["String"]>>;
  resources_used?: Maybe<Array<ResourceUsedInput>>;
  rescue_type?: Maybe<Scalars["String"]>;
};

export type CreateSubTypeInput = {
  name: Scalars["String"];
  code: Scalars["String"];
};

export type CreateTrainingInput = {
  description: Scalars["String"];
  date: Scalars["DateTime"];
  volunteers: Array<OnlyIdVolunteerInput>;
};

export type CreateUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  password: Scalars["String"];
};

export type CreateVolunteerInput = {
  name: Scalars["String"];
  code: Scalars["String"];
  address?: Maybe<Scalars["String"]>;
  blood_type?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  incorporation_date?: Maybe<Scalars["DateTime"]>;
  birth_date?: Maybe<Scalars["DateTime"]>;
  rank: OnlyIdTypeInput;
};

export type Detail = {
  __typename?: "Detail";
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  count: Scalars["Float"];
};

export type Duty = {
  __typename?: "Duty";
  id: Scalars["String"];
  name: Scalars["String"];
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Event = {
  __typename?: "Event";
  id: Scalars["String"];
  _id: Scalars["String"];
  description: Scalars["String"];
  created_by?: Maybe<Volunteer>;
};

export type FireCause = {
  __typename?: "FireCause";
  id: Scalars["String"];
  _id: Scalars["String"];
  name: Scalars["String"];
};

export type FireClass = {
  __typename?: "FireClass";
  id?: Maybe<Scalars["String"]>;
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Guard = {
  __typename?: "Guard";
  id: Scalars["String"];
  start_time: Scalars["Timestamp"];
  end_time: Scalars["Timestamp"];
  volunteers?: Maybe<Array<Volunteer>>;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: AccessToken;
  createUser: User;
  updateUser: User;
  removeUser: User;
  restoreUser: User;
  createDuty: Duty;
  updateDuty: Duty;
  removeDuty: Duty;
  restoreDuty: Duty;
  createRank: Rank;
  updateRank: Rank;
  removeRank: Rank;
  restoreRank: Rank;
  createService: Service;
  updateService: Service;
  removeService: Service;
  restoreService: Service;
  createVolunteer: Volunteer;
  updateVolunteer: Volunteer;
  removeVolunteer: Volunteer;
  restoreVolunteer: Volunteer;
  createSubType: SubType;
  updateSubType: SubType;
  removeSubType: SubType;
  restoreSubType: SubType;
  createFireCause: FireCause;
  updateFireCause: FireCause;
  removeFireCause: FireCause;
  restoreFireCause: FireCause;
  createFireClass: FireClass;
  updateFireClass: FireClass;
  removeFireClass: FireClass;
  restoreFireClass: FireClass;
  createGuard: Guard;
  updateGuard: Guard;
  removeGuard: Guard;
  restoreGuard: Guard;
  createEvent: Event;
  updateEvent: Event;
  removeEvent: Event;
  restoreEvent: Event;
  createTraining: Training;
  updateTraining: Training;
  removeTraining: Training;
  restoreTraining: Training;
  createCourse: Course;
  updateCourse: Course;
  removeCourse: Course;
  restoreCourse: Course;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationRemoveUserArgs = {
  id: Scalars["String"];
};

export type MutationRestoreUserArgs = {
  id: Scalars["String"];
};

export type MutationCreateDutyArgs = {
  createDutyInput: CreateDutyInput;
};

export type MutationUpdateDutyArgs = {
  updateDutyInput: UpdateDutyInput;
};

export type MutationRemoveDutyArgs = {
  id: Scalars["String"];
};

export type MutationRestoreDutyArgs = {
  id: Scalars["String"];
};

export type MutationCreateRankArgs = {
  createRankInput: CreateRankInput;
};

export type MutationUpdateRankArgs = {
  updateRankInput: UpdateRankInput;
};

export type MutationRemoveRankArgs = {
  id: Scalars["String"];
};

export type MutationRestoreRankArgs = {
  id: Scalars["String"];
};

export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};

export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput;
};

export type MutationRemoveServiceArgs = {
  id: Scalars["String"];
};

export type MutationRestoreServiceArgs = {
  id: Scalars["String"];
};

export type MutationCreateVolunteerArgs = {
  createVolunteerInput: CreateVolunteerInput;
};

export type MutationUpdateVolunteerArgs = {
  updateVolunteerInput: UpdateVolunteerInput;
};

export type MutationRemoveVolunteerArgs = {
  id: Scalars["String"];
};

export type MutationRestoreVolunteerArgs = {
  id: Scalars["String"];
};

export type MutationCreateSubTypeArgs = {
  createSubTypeInput: CreateSubTypeInput;
};

export type MutationUpdateSubTypeArgs = {
  updateSubTypeInput: UpdateSubTypeInput;
};

export type MutationRemoveSubTypeArgs = {
  id: Scalars["String"];
};

export type MutationRestoreSubTypeArgs = {
  id: Scalars["String"];
};

export type MutationCreateFireCauseArgs = {
  createFireCauseInput: CreateFireCauseInput;
};

export type MutationUpdateFireCauseArgs = {
  updateFireCauseInput: UpdateFireCauseInput;
};

export type MutationRemoveFireCauseArgs = {
  id: Scalars["String"];
};

export type MutationRestoreFireCauseArgs = {
  id: Scalars["String"];
};

export type MutationCreateFireClassArgs = {
  createFireClassInput: CreateFireClassInput;
};

export type MutationUpdateFireClassArgs = {
  updateFireClassInput: UpdateFireClassInput;
};

export type MutationRemoveFireClassArgs = {
  id: Scalars["String"];
};

export type MutationRestoreFireClassArgs = {
  id: Scalars["String"];
};

export type MutationCreateGuardArgs = {
  createGuardInput: CreateGuardInput;
};

export type MutationUpdateGuardArgs = {
  updateGuardInput: UpdateGuardInput;
};

export type MutationRemoveGuardArgs = {
  id: Scalars["String"];
};

export type MutationRestoreGuardArgs = {
  id: Scalars["String"];
};

export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};

export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
};

export type MutationRemoveEventArgs = {
  id: Scalars["String"];
};

export type MutationRestoreEventArgs = {
  id: Scalars["String"];
};

export type MutationCreateTrainingArgs = {
  createTrainingInput: CreateTrainingInput;
};

export type MutationUpdateTrainingArgs = {
  updateTrainingInput: UpdateTrainingInput;
};

export type MutationRemoveTrainingArgs = {
  id: Scalars["String"];
};

export type MutationRestoreTrainingArgs = {
  id: Scalars["String"];
};

export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};

export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};

export type MutationRemoveCourseArgs = {
  id: Scalars["String"];
};

export type MutationRestoreCourseArgs = {
  id: Scalars["String"];
};

export type OnlyIdFireClassInput = {
  _id: Scalars["String"];
};

export type OnlyIdSubTypeInput = {
  _id: Scalars["String"];
};

export type OnlyIdTypeInput = {
  id: Scalars["String"];
};

export type OnlyIdVolunteerInput = {
  _id: Scalars["String"];
};

export type Quantity1044 = {
  __typename?: "Quantity1044";
  name?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Float"]>;
};

export type Quantity1044Input = {
  name?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Float"]>;
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
  users: Array<User>;
  usersDisabled: Array<User>;
  user: User;
  duties: Array<Duty>;
  dutiesDisabled: Array<Duty>;
  duty: Duty;
  ranks: Array<Rank>;
  ranksDisabled: Array<Rank>;
  rank: Rank;
  services: Array<Service>;
  servicesDisabled: Array<Service>;
  service: Service;
  volunteers: Array<Volunteer>;
  volunteersDisabled: Array<Volunteer>;
  volunteer: Volunteer;
  subTypes: Array<SubType>;
  subTypesDisabled: Array<SubType>;
  subType: SubType;
  fireCauses: Array<FireCause>;
  fireCausesDisabled: Array<FireCause>;
  fireCause: FireCause;
  fireClasses: Array<FireClass>;
  fireClassesDisabled: Array<FireClass>;
  fireClass: FireClass;
  guards: Array<Guard>;
  guardsDisabled: Array<Guard>;
  guard: Guard;
  currentGuard?: Maybe<Guard>;
  nextGuard?: Maybe<Guard>;
  events: Array<Event>;
  eventsDisabled: Array<Event>;
  event: Event;
  trainings: Array<Training>;
  trainingsDisabled: Array<Training>;
  training: Training;
  courses: Array<Course>;
  coursesDisabled: Array<Course>;
  course: Course;
  report: Report;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QueryDutyArgs = {
  id: Scalars["String"];
};

export type QueryRankArgs = {
  id: Scalars["String"];
};

export type QueryServiceArgs = {
  id: Scalars["String"];
};

export type QueryVolunteerArgs = {
  id: Scalars["String"];
};

export type QuerySubTypeArgs = {
  id: Scalars["String"];
};

export type QueryFireCauseArgs = {
  id: Scalars["String"];
};

export type QueryFireClassArgs = {
  id: Scalars["Int"];
};

export type QueryGuardArgs = {
  id: Scalars["String"];
};

export type QueryEventArgs = {
  id: Scalars["String"];
};

export type QueryTrainingArgs = {
  id: Scalars["String"];
};

export type QueryCourseArgs = {
  id: Scalars["String"];
};

export type QueryReportArgs = {
  endDate: Scalars["Float"];
  startDate: Scalars["Float"];
};

export type Rank = {
  __typename?: "Rank";
  id: Scalars["String"];
  name: Scalars["String"];
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Report = {
  __typename?: "Report";
  date?: Maybe<Scalars["DateTime"]>;
  startDate?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["DateTime"]>;
  subTypeCount1040?: Maybe<Array<Detail>>;
  subTypeCount1041?: Maybe<Array<Detail>>;
  subTypeCount1043?: Maybe<Array<Detail>>;
  count1040?: Maybe<Scalars["Float"]>;
  count1041?: Maybe<Scalars["Float"]>;
  count1043?: Maybe<Scalars["Float"]>;
  damageCount?: Maybe<Array<Detail>>;
  quantities1044Count1040?: Maybe<Array<Detail>>;
  quantities1044Count1041?: Maybe<Array<Detail>>;
  quantities1044Count1043?: Maybe<Array<Detail>>;
  possibleCausesCount?: Maybe<Array<Detail>>;
  resourcesUsedCount1040?: Maybe<Array<Detail>>;
  resourcesUsedCount1041?: Maybe<Array<Detail>>;
  damage1041Count?: Maybe<Array<Detail>>;
  involvedElementsCount?: Maybe<Array<Detail>>;
  magnitude1041Count?: Maybe<Array<Detail>>;
  rescueTypeCount?: Maybe<Array<Detail>>;
};

export type ResourceUsed = {
  __typename?: "ResourceUsed";
  resource?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Float"]>;
};

export type ResourceUsedInput = {
  resource?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Float"]>;
};

export type Service = {
  __typename?: "Service";
  _id?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  date: Scalars["DateTime"];
  type?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  volunteers?: Maybe<Array<Volunteer>>;
  call_time?: Maybe<Scalars["String"]>;
  departure_time?: Maybe<Scalars["String"]>;
  arrival_time?: Maybe<Scalars["String"]>;
  withdrawal_time?: Maybe<Scalars["String"]>;
  locality?: Maybe<Scalars["String"]>;
  neighborhood?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  place?: Maybe<Scalars["String"]>;
  alerted_by?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  received_by?: Maybe<Scalars["String"]>;
  crew?: Maybe<Scalars["String"]>;
  officer_in_charge?: Maybe<Volunteer>;
  sub_type?: Maybe<SubType>;
  fire_type_total_surface?: Maybe<Scalars["Float"]>;
  fire_type_burned_surface?: Maybe<Scalars["Float"]>;
  fire_type_description?: Maybe<Scalars["String"]>;
  affected_owner?: Maybe<Scalars["String"]>;
  affected_owner_description?: Maybe<Scalars["String"]>;
  possible_cause?: Maybe<FireCause>;
  possible_cause_other_description?: Maybe<Scalars["String"]>;
  fire_class?: Maybe<Array<FireClass>>;
  magnitude?: Maybe<Scalars["String"]>;
  damage?: Maybe<Scalars["String"]>;
  vehicles_used?: Maybe<Scalars["String"]>;
  other_units?: Maybe<Scalars["String"]>;
  other_occurrences?: Maybe<Scalars["String"]>;
  police_force_in_charge?: Maybe<Scalars["String"]>;
  judge_in_charge?: Maybe<Scalars["String"]>;
  damage1041?: Maybe<Array<Scalars["String"]>>;
  quantities1044?: Maybe<Array<Quantity1044>>;
  involved_elements?: Maybe<Array<Scalars["String"]>>;
  magnitude1041?: Maybe<Array<Scalars["String"]>>;
  resources_used?: Maybe<Array<ResourceUsed>>;
  rescue_type?: Maybe<Scalars["String"]>;
};

export type SubType = {
  __typename?: "SubType";
  id?: Maybe<Scalars["String"]>;
  _id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  code: Scalars["String"];
};

export type Training = {
  __typename?: "Training";
  id: Scalars["String"];
  description: Scalars["String"];
  date: Scalars["DateTime"];
  volunteers?: Maybe<Array<Volunteer>>;
};

export type UpdateCourseInput = {
  description?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["DateTime"]>;
  details?: Maybe<Array<CourseDetailInput>>;
  id: Scalars["String"];
};

export type UpdateDutyInput = {
  name?: Maybe<Scalars["String"]>;
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateEventInput = {
  description?: Maybe<Scalars["String"]>;
  created_by?: Maybe<OnlyIdVolunteerInput>;
  id: Scalars["String"];
};

export type UpdateFireCauseInput = {
  name: Scalars["String"];
  id: Scalars["String"];
};

export type UpdateFireClassInput = {
  name: Scalars["String"];
  id: Scalars["String"];
};

export type UpdateGuardInput = {
  start_time?: Maybe<Scalars["Timestamp"]>;
  end_time?: Maybe<Scalars["Timestamp"]>;
  volunteers?: Maybe<Array<OnlyIdVolunteerInput>>;
  id: Scalars["String"];
};

export type UpdateRankInput = {
  name?: Maybe<Scalars["String"]>;
  isDeletable?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateServiceInput = {
  type?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  volunteers?: Maybe<Array<OnlyIdVolunteerInput>>;
  date?: Maybe<Scalars["DateTime"]>;
  call_time?: Maybe<Scalars["String"]>;
  departure_time?: Maybe<Scalars["String"]>;
  arrival_time?: Maybe<Scalars["String"]>;
  withdrawal_time?: Maybe<Scalars["String"]>;
  locality?: Maybe<Scalars["String"]>;
  neighborhood?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  place?: Maybe<Scalars["String"]>;
  alerted_by?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  received_by?: Maybe<Scalars["String"]>;
  crew?: Maybe<Scalars["String"]>;
  officer_in_charge?: Maybe<OnlyIdVolunteerInput>;
  sub_type?: Maybe<OnlyIdSubTypeInput>;
  fire_type_total_surface?: Maybe<Scalars["Float"]>;
  fire_type_burned_surface?: Maybe<Scalars["Float"]>;
  fire_type_description?: Maybe<Scalars["String"]>;
  affected_owner?: Maybe<Scalars["String"]>;
  affected_owner_description?: Maybe<Scalars["String"]>;
  possible_cause?: Maybe<OnlyIdFireClassInput>;
  possible_cause_other_description?: Maybe<Scalars["String"]>;
  fire_class?: Maybe<Array<OnlyIdFireClassInput>>;
  magnitude?: Maybe<Scalars["String"]>;
  damage?: Maybe<Scalars["String"]>;
  vehicles_used?: Maybe<Scalars["String"]>;
  other_units?: Maybe<Scalars["String"]>;
  other_occurrences?: Maybe<Scalars["String"]>;
  police_force_in_charge?: Maybe<Scalars["String"]>;
  judge_in_charge?: Maybe<Scalars["String"]>;
  damage1041?: Maybe<Array<Scalars["String"]>>;
  quantities1044?: Maybe<Array<Quantity1044Input>>;
  involved_elements?: Maybe<Array<Scalars["String"]>>;
  magnitude1041?: Maybe<Array<Scalars["String"]>>;
  resources_used?: Maybe<Array<ResourceUsedInput>>;
  rescue_type?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateSubTypeInput = {
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateTrainingInput = {
  description?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["DateTime"]>;
  volunteers?: Maybe<Array<OnlyIdVolunteerInput>>;
  id: Scalars["String"];
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
  password?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateVolunteerInput = {
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  blood_type?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  incorporation_date?: Maybe<Scalars["DateTime"]>;
  birth_date?: Maybe<Scalars["DateTime"]>;
  rank?: Maybe<OnlyIdTypeInput>;
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  password: Scalars["String"];
};

export type Volunteer = {
  __typename?: "Volunteer";
  id?: Maybe<Scalars["String"]>;
  _id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  code: Scalars["String"];
  blood_type?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  incorporation_date?: Maybe<Scalars["DateTime"]>;
  birth_date?: Maybe<Scalars["DateTime"]>;
  rank: Rank;
};

export type CourseDetailInput = {
  score: Scalars["String"];
  volunteer: OnlyIdVolunteerInput;
};

export type CoursesAllFieldsFragment = { __typename?: "Course" } & Pick<Course, "id" | "description" | "date"> & {
    details?: Maybe<
      Array<
        { __typename?: "CourseDetail" } & Pick<CourseDetail, "score"> & {
            volunteer?: Maybe<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>;
          }
      >
    >;
  };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCoursesQuery = { __typename?: "Query" } & {
  courses: Array<{ __typename?: "Course" } & CoursesAllFieldsFragment>;
};

export type GetCoursesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetCoursesDisabledQuery = { __typename?: "Query" } & {
  coursesDisabled: Array<{ __typename?: "Course" } & CoursesAllFieldsFragment>;
};

export type FindCourseQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindCourseQuery = { __typename?: "Query" } & {
  course: { __typename?: "Course" } & CoursesAllFieldsFragment;
};

export type EditCourseMutationVariables = Exact<{
  input: UpdateCourseInput;
}>;

export type EditCourseMutation = { __typename?: "Mutation" } & {
  updateCourse: { __typename?: "Course" } & CoursesAllFieldsFragment;
};

export type CreateCourseMutationVariables = Exact<{
  input: CreateCourseInput;
}>;

export type CreateCourseMutation = { __typename?: "Mutation" } & {
  createCourse: { __typename?: "Course" } & CoursesAllFieldsFragment;
};

export type RemoveCourseMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveCourseMutation = { __typename?: "Mutation" } & {
  removeCourse: { __typename?: "Course" } & CoursesAllFieldsFragment;
};

export type RestoreCourseMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreCourseMutation = { __typename?: "Mutation" } & {
  restoreCourse: { __typename?: "Course" } & CoursesAllFieldsFragment;
};

export type GuardAllFieldsFragment = { __typename?: "Guard" } & Pick<Guard, "id" | "start_time" | "end_time"> & {
    volunteers?: Maybe<Array<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>>;
  };

export type GetGuardsQueryVariables = Exact<{ [key: string]: never }>;

export type GetGuardsQuery = { __typename?: "Query" } & {
  guards: Array<{ __typename?: "Guard" } & GuardAllFieldsFragment>;
};

export type CurrentGuardQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentGuardQuery = { __typename?: "Query" } & {
  currentGuard?: Maybe<{ __typename?: "Guard" } & GuardAllFieldsFragment>;
};

export type NextGuardQueryVariables = Exact<{ [key: string]: never }>;

export type NextGuardQuery = { __typename?: "Query" } & {
  nextGuard?: Maybe<{ __typename?: "Guard" } & GuardAllFieldsFragment>;
};

export type GetGuardsDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetGuardsDisabledQuery = { __typename?: "Query" } & {
  guardsDisabled: Array<{ __typename?: "Guard" } & GuardAllFieldsFragment>;
};

export type FindGuardQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindGuardQuery = { __typename?: "Query" } & { guard: { __typename?: "Guard" } & GuardAllFieldsFragment };

export type EditGuardMutationVariables = Exact<{
  input: UpdateGuardInput;
}>;

export type EditGuardMutation = { __typename?: "Mutation" } & {
  updateGuard: { __typename?: "Guard" } & GuardAllFieldsFragment;
};

export type CreateGuardMutationVariables = Exact<{
  input: CreateGuardInput;
}>;

export type CreateGuardMutation = { __typename?: "Mutation" } & {
  createGuard: { __typename?: "Guard" } & GuardAllFieldsFragment;
};

export type RemoveGuardMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveGuardMutation = { __typename?: "Mutation" } & {
  removeGuard: { __typename?: "Guard" } & GuardAllFieldsFragment;
};

export type RestoreGuardMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreGuardMutation = { __typename?: "Mutation" } & {
  restoreGuard: { __typename?: "Guard" } & GuardAllFieldsFragment;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AccessToken" } & Pick<AccessToken, "access_token">;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<{ __typename?: "User" } & UserAllFieldsFragment>;
};

export type ReportAllFieldsFragment = { __typename?: "Report" } & Pick<
  Report,
  "date" | "startDate" | "endDate" | "count1040" | "count1041" | "count1043"
> & {
    subTypeCount1040?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    subTypeCount1041?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    subTypeCount1043?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    damageCount?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    quantities1044Count1040?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    quantities1044Count1041?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    quantities1044Count1043?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    involvedElementsCount?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    magnitude1041Count?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "count">>>;
    possibleCausesCount?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    resourcesUsedCount1040?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    resourcesUsedCount1041?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    rescueTypeCount?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
    damage1041Count?: Maybe<Array<{ __typename?: "Detail" } & Pick<Detail, "id" | "name" | "count">>>;
  };

export type GetReportQueryVariables = Exact<{
  startDate: Scalars["Float"];
  endDate: Scalars["Float"];
}>;

export type GetReportQuery = { __typename?: "Query" } & { report: { __typename?: "Report" } & ReportAllFieldsFragment };

export type TrainingAllFieldsFragment = { __typename?: "Training" } & Pick<Training, "id" | "description" | "date"> & {
    volunteers?: Maybe<Array<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>>;
  };

export type GetTrainingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTrainingsQuery = { __typename?: "Query" } & {
  trainings: Array<{ __typename?: "Training" } & TrainingAllFieldsFragment>;
};

export type GetTrainingsDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetTrainingsDisabledQuery = { __typename?: "Query" } & {
  trainingsDisabled: Array<{ __typename?: "Training" } & TrainingAllFieldsFragment>;
};

export type FindTrainingQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindTrainingQuery = { __typename?: "Query" } & {
  training: { __typename?: "Training" } & TrainingAllFieldsFragment;
};

export type EditTrainingMutationVariables = Exact<{
  input: UpdateTrainingInput;
}>;

export type EditTrainingMutation = { __typename?: "Mutation" } & {
  updateTraining: { __typename?: "Training" } & TrainingAllFieldsFragment;
};

export type CreateTrainingMutationVariables = Exact<{
  input: CreateTrainingInput;
}>;

export type CreateTrainingMutation = { __typename?: "Mutation" } & {
  createTraining: { __typename?: "Training" } & TrainingAllFieldsFragment;
};

export type RemoveTrainingMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveTrainingMutation = { __typename?: "Mutation" } & {
  removeTraining: { __typename?: "Training" } & TrainingAllFieldsFragment;
};

export type RestoreTrainingMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreTrainingMutation = { __typename?: "Mutation" } & {
  restoreTraining: { __typename?: "Training" } & TrainingAllFieldsFragment;
};

export type UserAllFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "isAdmin" | "email" | "lastName" | "firstName" | "username"
>;

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & UserAllFieldsFragment>;
};

export type GetUsersDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersDisabledQuery = { __typename?: "Query" } & {
  usersDisabled: Array<{ __typename?: "User" } & UserAllFieldsFragment>;
};

export type FindUserQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindUserQuery = { __typename?: "Query" } & { user: { __typename?: "User" } & UserAllFieldsFragment };

export type EditUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type EditUserMutation = { __typename?: "Mutation" } & {
  updateUser: { __typename?: "User" } & UserAllFieldsFragment;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & UserAllFieldsFragment;
};

export type RemoveUserMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveUserMutation = { __typename?: "Mutation" } & {
  removeUser: { __typename?: "User" } & UserAllFieldsFragment;
};

export type RestoreUserMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreUserMutation = { __typename?: "Mutation" } & {
  restoreUser: { __typename?: "User" } & UserAllFieldsFragment;
};

export type DutyAllFieldsFragment = { __typename?: "Duty" } & Pick<Duty, "id" | "name" | "isDeletable" | "description">;

export type GetDutiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDutiesQuery = { __typename?: "Query" } & {
  duties: Array<{ __typename?: "Duty" } & DutyAllFieldsFragment>;
};

export type GetDutiesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetDutiesDisabledQuery = { __typename?: "Query" } & {
  dutiesDisabled: Array<{ __typename?: "Duty" } & DutyAllFieldsFragment>;
};

export type FindDutyQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindDutyQuery = { __typename?: "Query" } & { duty: { __typename?: "Duty" } & DutyAllFieldsFragment };

export type EditDutyMutationVariables = Exact<{
  input: UpdateDutyInput;
}>;

export type EditDutyMutation = { __typename?: "Mutation" } & {
  updateDuty: { __typename?: "Duty" } & DutyAllFieldsFragment;
};

export type CreateDutyMutationVariables = Exact<{
  input: CreateDutyInput;
}>;

export type CreateDutyMutation = { __typename?: "Mutation" } & {
  createDuty: { __typename?: "Duty" } & DutyAllFieldsFragment;
};

export type DeleteDutyMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteDutyMutation = { __typename?: "Mutation" } & {
  removeDuty: { __typename?: "Duty" } & Pick<Duty, "id">;
};

export type RestoreDutyMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreDutyMutation = { __typename?: "Mutation" } & {
  restoreDuty: { __typename?: "Duty" } & Pick<Duty, "id">;
};

export type EventAllFieldsFragment = { __typename?: "Event" } & Pick<Event, "id" | "description"> & {
    created_by?: Maybe<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>;
  };

export type GetEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEventsQuery = { __typename?: "Query" } & {
  events: Array<{ __typename?: "Event" } & EventAllFieldsFragment>;
};

export type GetEventsDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetEventsDisabledQuery = { __typename?: "Query" } & {
  eventsDisabled: Array<{ __typename?: "Event" } & EventAllFieldsFragment>;
};

export type FindEventQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindEventQuery = { __typename?: "Query" } & { event: { __typename?: "Event" } & EventAllFieldsFragment };

export type EditEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;

export type EditEventMutation = { __typename?: "Mutation" } & {
  updateEvent: { __typename?: "Event" } & EventAllFieldsFragment;
};

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;

export type CreateEventMutation = { __typename?: "Mutation" } & {
  createEvent: { __typename?: "Event" } & EventAllFieldsFragment;
};

export type RemoveEventMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveEventMutation = { __typename?: "Mutation" } & {
  removeEvent: { __typename?: "Event" } & EventAllFieldsFragment;
};

export type RestoreEventMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreEventMutation = { __typename?: "Mutation" } & {
  restoreEvent: { __typename?: "Event" } & EventAllFieldsFragment;
};

export type FireCauseAllFieldsFragment = { __typename?: "FireCause" } & Pick<FireCause, "id" | "name">;

export type GetFireCausesQueryVariables = Exact<{ [key: string]: never }>;

export type GetFireCausesQuery = { __typename?: "Query" } & {
  fireCauses: Array<{ __typename?: "FireCause" } & FireCauseAllFieldsFragment>;
};

export type GetFireCausesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetFireCausesDisabledQuery = { __typename?: "Query" } & {
  fireCausesDisabled: Array<{ __typename?: "FireCause" } & FireCauseAllFieldsFragment>;
};

export type RemoveFireCauseMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveFireCauseMutation = { __typename?: "Mutation" } & {
  removeFireCause: { __typename?: "FireCause" } & FireCauseAllFieldsFragment;
};

export type RestoreFireCauseMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreFireCauseMutation = { __typename?: "Mutation" } & {
  restoreFireCause: { __typename?: "FireCause" } & FireCauseAllFieldsFragment;
};

export type FireClassAllFieldsFragment = { __typename?: "FireClass" } & Pick<FireClass, "id" | "name">;

export type GetFireClassesQueryVariables = Exact<{ [key: string]: never }>;

export type GetFireClassesQuery = { __typename?: "Query" } & {
  fireClasses: Array<{ __typename?: "FireClass" } & FireClassAllFieldsFragment>;
};

export type GetFireClassesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetFireClassesDisabledQuery = { __typename?: "Query" } & {
  fireClassesDisabled: Array<{ __typename?: "FireClass" } & FireClassAllFieldsFragment>;
};

export type RemoveFireClassMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveFireClassMutation = { __typename?: "Mutation" } & {
  removeFireClass: { __typename?: "FireClass" } & FireClassAllFieldsFragment;
};

export type RestoreFireClassMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreFireClassMutation = { __typename?: "Mutation" } & {
  restoreFireClass: { __typename?: "FireClass" } & FireClassAllFieldsFragment;
};

export type RankAllFieldsFragment = { __typename?: "Rank" } & Pick<Rank, "id" | "name" | "isDeletable" | "description">;

export type GetRanksQueryVariables = Exact<{ [key: string]: never }>;

export type GetRanksQuery = { __typename?: "Query" } & {
  ranks: Array<{ __typename?: "Rank" } & RankAllFieldsFragment>;
};

export type GetRanksDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetRanksDisabledQuery = { __typename?: "Query" } & {
  ranksDisabled: Array<{ __typename?: "Rank" } & RankAllFieldsFragment>;
};

export type FindRankQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindRankQuery = { __typename?: "Query" } & { rank: { __typename?: "Rank" } & RankAllFieldsFragment };

export type EditRankMutationVariables = Exact<{
  input: UpdateRankInput;
}>;

export type EditRankMutation = { __typename?: "Mutation" } & {
  updateRank: { __typename?: "Rank" } & RankAllFieldsFragment;
};

export type CreateRankMutationVariables = Exact<{
  input: CreateRankInput;
}>;

export type CreateRankMutation = { __typename?: "Mutation" } & {
  createRank: { __typename?: "Rank" } & RankAllFieldsFragment;
};

export type DeleteRankMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteRankMutation = { __typename?: "Mutation" } & {
  removeRank: { __typename?: "Rank" } & Pick<Rank, "id">;
};

export type RestoreRankMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreRankMutation = { __typename?: "Mutation" } & {
  restoreRank: { __typename?: "Rank" } & Pick<Rank, "id">;
};

export type ServicesAllFieldsFragment = { __typename?: "Service" } & Pick<
  Service,
  | "id"
  | "type"
  | "date"
  | "description"
  | "call_time"
  | "departure_time"
  | "arrival_time"
  | "withdrawal_time"
  | "locality"
  | "neighborhood"
  | "address"
  | "place"
  | "alerted_by"
  | "phone"
  | "received_by"
  | "crew"
  | "fire_type_total_surface"
  | "fire_type_burned_surface"
  | "fire_type_description"
  | "affected_owner"
  | "affected_owner_description"
  | "possible_cause_other_description"
  | "magnitude"
  | "damage"
  | "vehicles_used"
  | "other_units"
  | "other_occurrences"
  | "police_force_in_charge"
  | "judge_in_charge"
  | "damage1041"
  | "involved_elements"
  | "magnitude1041"
  | "rescue_type"
> & {
    volunteers?: Maybe<Array<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>>;
    officer_in_charge?: Maybe<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>;
    sub_type?: Maybe<{ __typename?: "SubType" } & SubTypeAllFieldsFragment>;
    possible_cause?: Maybe<{ __typename?: "FireCause" } & FireCauseAllFieldsFragment>;
    fire_class?: Maybe<Array<{ __typename?: "FireClass" } & FireClassAllFieldsFragment>>;
    quantities1044?: Maybe<Array<{ __typename?: "Quantity1044" } & Pick<Quantity1044, "name" | "quantity">>>;
    resources_used?: Maybe<Array<{ __typename?: "ResourceUsed" } & Pick<ResourceUsed, "resource" | "quantity">>>;
  };

export type GetServicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & ServicesAllFieldsFragment>;
};

export type GetServicesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetServicesDisabledQuery = { __typename?: "Query" } & {
  servicesDisabled: Array<{ __typename?: "Service" } & ServicesAllFieldsFragment>;
};

export type FindServiceQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindServiceQuery = { __typename?: "Query" } & {
  service: { __typename?: "Service" } & ServicesAllFieldsFragment;
};

export type EditServiceMutationVariables = Exact<{
  input: UpdateServiceInput;
}>;

export type EditServiceMutation = { __typename?: "Mutation" } & {
  updateService: { __typename?: "Service" } & ServicesAllFieldsFragment;
};

export type CreateServiceMutationVariables = Exact<{
  input: CreateServiceInput;
}>;

export type CreateServiceMutation = { __typename?: "Mutation" } & {
  createService: { __typename?: "Service" } & ServicesAllFieldsFragment;
};

export type RemoveServiceMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveServiceMutation = { __typename?: "Mutation" } & {
  removeService: { __typename?: "Service" } & ServicesAllFieldsFragment;
};

export type RestoreServiceMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreServiceMutation = { __typename?: "Mutation" } & {
  restoreService: { __typename?: "Service" } & ServicesAllFieldsFragment;
};

export type SubTypeAllFieldsFragment = { __typename?: "SubType" } & Pick<SubType, "id" | "name" | "code">;

export type GetSubTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetSubTypesQuery = { __typename?: "Query" } & {
  subTypes: Array<{ __typename?: "SubType" } & SubTypeAllFieldsFragment>;
};

export type GetSubTypesDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetSubTypesDisabledQuery = { __typename?: "Query" } & {
  subTypesDisabled: Array<{ __typename?: "SubType" } & SubTypeAllFieldsFragment>;
};

export type VolunteerAllFieldsFragment = { __typename?: "Volunteer" } & Pick<
  Volunteer,
  "id" | "name" | "code" | "address" | "blood_type" | "status" | "incorporation_date" | "birth_date"
> & { rank: { __typename?: "Rank" } & RankAllFieldsFragment };

export type GetVolunteersQueryVariables = Exact<{ [key: string]: never }>;

export type GetVolunteersQuery = { __typename?: "Query" } & {
  volunteers: Array<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>;
};

export type GetVolunteersDisabledQueryVariables = Exact<{ [key: string]: never }>;

export type GetVolunteersDisabledQuery = { __typename?: "Query" } & {
  volunteersDisabled: Array<{ __typename?: "Volunteer" } & VolunteerAllFieldsFragment>;
};

export type FindVolunteerQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type FindVolunteerQuery = { __typename?: "Query" } & {
  volunteer: { __typename?: "Volunteer" } & VolunteerAllFieldsFragment;
};

export type EditVolunteerMutationVariables = Exact<{
  input: UpdateVolunteerInput;
}>;

export type EditVolunteerMutation = { __typename?: "Mutation" } & {
  updateVolunteer: { __typename?: "Volunteer" } & VolunteerAllFieldsFragment;
};

export type CreateVolunteerMutationVariables = Exact<{
  input: CreateVolunteerInput;
}>;

export type CreateVolunteerMutation = { __typename?: "Mutation" } & {
  createVolunteer: { __typename?: "Volunteer" } & VolunteerAllFieldsFragment;
};

export type DeleteVolunteerMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteVolunteerMutation = { __typename?: "Mutation" } & {
  removeVolunteer: { __typename?: "Volunteer" } & Pick<Volunteer, "id">;
};

export type RestoreVolunteerMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RestoreVolunteerMutation = { __typename?: "Mutation" } & {
  restoreVolunteer: { __typename?: "Volunteer" } & Pick<Volunteer, "id">;
};

export const RankAllFieldsFragmentDoc = gql`
  fragment rankAllFields on Rank {
    id
    name
    isDeletable
    description
  }
`;
export const VolunteerAllFieldsFragmentDoc = gql`
  fragment volunteerAllFields on Volunteer {
    id
    name
    code
    address
    blood_type
    status
    incorporation_date
    birth_date
    rank {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export const CoursesAllFieldsFragmentDoc = gql`
  fragment coursesAllFields on Course {
    id
    description
    date
    details {
      score
      volunteer {
        ...volunteerAllFields
      }
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export const GuardAllFieldsFragmentDoc = gql`
  fragment guardAllFields on Guard {
    id
    start_time
    end_time
    volunteers {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export const ReportAllFieldsFragmentDoc = gql`
  fragment reportAllFields on Report {
    date
    startDate
    endDate
    subTypeCount1040 {
      id
      name
      count
    }
    subTypeCount1041 {
      id
      name
      count
    }
    subTypeCount1043 {
      id
      name
      count
    }
    count1040
    count1041
    count1043
    damageCount {
      id
      count
    }
    quantities1044Count1040 {
      id
      count
    }
    quantities1044Count1041 {
      id
      count
    }
    quantities1044Count1043 {
      id
      count
    }
    involvedElementsCount {
      id
      count
    }
    magnitude1041Count {
      id
      count
    }
    possibleCausesCount {
      id
      name
      count
    }
    possibleCausesCount {
      id
      name
      count
    }
    resourcesUsedCount1040 {
      id
      name
      count
    }
    resourcesUsedCount1041 {
      id
      name
      count
    }
    rescueTypeCount {
      id
      name
      count
    }
    damage1041Count {
      id
      name
      count
    }
  }
`;
export const TrainingAllFieldsFragmentDoc = gql`
  fragment trainingAllFields on Training {
    id
    description
    date
    volunteers {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export const UserAllFieldsFragmentDoc = gql`
  fragment userAllFields on User {
    id
    isAdmin
    email
    lastName
    firstName
    username
  }
`;
export const DutyAllFieldsFragmentDoc = gql`
  fragment dutyAllFields on Duty {
    id
    name
    isDeletable
    description
  }
`;
export const EventAllFieldsFragmentDoc = gql`
  fragment eventAllFields on Event {
    id
    description
    created_by {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export const SubTypeAllFieldsFragmentDoc = gql`
  fragment subTypeAllFields on SubType {
    id
    name
    code
  }
`;
export const FireCauseAllFieldsFragmentDoc = gql`
  fragment fireCauseAllFields on FireCause {
    id
    name
  }
`;
export const FireClassAllFieldsFragmentDoc = gql`
  fragment fireClassAllFields on FireClass {
    id
    name
  }
`;
export const ServicesAllFieldsFragmentDoc = gql`
  fragment servicesAllFields on Service {
    id
    type
    date
    description
    call_time
    departure_time
    arrival_time
    withdrawal_time
    locality
    neighborhood
    address
    place
    alerted_by
    phone
    received_by
    crew
    volunteers {
      ...volunteerAllFields
    }
    officer_in_charge {
      ...volunteerAllFields
    }
    sub_type {
      ...subTypeAllFields
    }
    fire_type_total_surface
    fire_type_burned_surface
    fire_type_description
    affected_owner
    affected_owner_description
    possible_cause {
      ...fireCauseAllFields
    }
    possible_cause_other_description
    fire_class {
      ...fireClassAllFields
    }
    magnitude
    damage
    vehicles_used
    other_units
    other_occurrences
    police_force_in_charge
    judge_in_charge
    damage1041
    quantities1044 {
      name
      quantity
    }
    involved_elements
    magnitude1041
    resources_used {
      resource
      quantity
    }
    rescue_type
  }
  ${VolunteerAllFieldsFragmentDoc}
  ${SubTypeAllFieldsFragmentDoc}
  ${FireCauseAllFieldsFragmentDoc}
  ${FireClassAllFieldsFragmentDoc}
`;
export const GetCoursesDocument = gql`
  query getCourses {
    courses {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type GetCoursesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCoursesQuery, GetCoursesQueryVariables>,
  "query"
>;

export const GetCoursesComponent = (props: GetCoursesComponentProps) => (
  <ApolloReactComponents.Query<GetCoursesQuery, GetCoursesQueryVariables> query={GetCoursesDocument} {...props} />
);

export type GetCoursesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCoursesQuery, GetCoursesQueryVariables>;
} & TChildProps;
export function withGetCourses<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCoursesQuery,
    GetCoursesQueryVariables,
    GetCoursesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCoursesQuery,
    GetCoursesQueryVariables,
    GetCoursesProps<TChildProps, TDataName>
  >(GetCoursesDocument, {
    alias: "getCourses",
    ...operationOptions,
  });
}
export type GetCoursesQueryResult = ApolloReactCommon.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetCoursesDisabledDocument = gql`
  query getCoursesDisabled {
    coursesDisabled {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type GetCoursesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCoursesDisabledQuery, GetCoursesDisabledQueryVariables>,
  "query"
>;

export const GetCoursesDisabledComponent = (props: GetCoursesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetCoursesDisabledQuery, GetCoursesDisabledQueryVariables>
    query={GetCoursesDisabledDocument}
    {...props}
  />
);

export type GetCoursesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCoursesDisabledQuery, GetCoursesDisabledQueryVariables>;
} & TChildProps;
export function withGetCoursesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCoursesDisabledQuery,
    GetCoursesDisabledQueryVariables,
    GetCoursesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCoursesDisabledQuery,
    GetCoursesDisabledQueryVariables,
    GetCoursesDisabledProps<TChildProps, TDataName>
  >(GetCoursesDisabledDocument, {
    alias: "getCoursesDisabled",
    ...operationOptions,
  });
}
export type GetCoursesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetCoursesDisabledQuery,
  GetCoursesDisabledQueryVariables
>;
export const FindCourseDocument = gql`
  query findCourse($id: String!) {
    course(id: $id) {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type FindCourseComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindCourseQuery, FindCourseQueryVariables>,
  "query"
> &
  ({ variables: FindCourseQueryVariables; skip?: boolean } | { skip: boolean });

export const FindCourseComponent = (props: FindCourseComponentProps) => (
  <ApolloReactComponents.Query<FindCourseQuery, FindCourseQueryVariables> query={FindCourseDocument} {...props} />
);

export type FindCourseProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindCourseQuery, FindCourseQueryVariables>;
} & TChildProps;
export function withFindCourse<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCourseQuery,
    FindCourseQueryVariables,
    FindCourseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCourseQuery,
    FindCourseQueryVariables,
    FindCourseProps<TChildProps, TDataName>
  >(FindCourseDocument, {
    alias: "findCourse",
    ...operationOptions,
  });
}
export type FindCourseQueryResult = ApolloReactCommon.QueryResult<FindCourseQuery, FindCourseQueryVariables>;
export const EditCourseDocument = gql`
  mutation editCourse($input: UpdateCourseInput!) {
    updateCourse(updateCourseInput: $input) {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type EditCourseMutationFn = ApolloReactCommon.MutationFunction<EditCourseMutation, EditCourseMutationVariables>;
export type EditCourseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditCourseMutation, EditCourseMutationVariables>,
  "mutation"
>;

export const EditCourseComponent = (props: EditCourseComponentProps) => (
  <ApolloReactComponents.Mutation<EditCourseMutation, EditCourseMutationVariables>
    mutation={EditCourseDocument}
    {...props}
  />
);

export type EditCourseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditCourseMutation, EditCourseMutationVariables>;
} & TChildProps;
export function withEditCourse<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditCourseMutation,
    EditCourseMutationVariables,
    EditCourseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditCourseMutation,
    EditCourseMutationVariables,
    EditCourseProps<TChildProps, TDataName>
  >(EditCourseDocument, {
    alias: "editCourse",
    ...operationOptions,
  });
}
export type EditCourseMutationResult = ApolloReactCommon.MutationResult<EditCourseMutation>;
export type EditCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditCourseMutation,
  EditCourseMutationVariables
>;
export const CreateCourseDocument = gql`
  mutation createCourse($input: CreateCourseInput!) {
    createCourse(createCourseInput: $input) {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type CreateCourseMutationFn = ApolloReactCommon.MutationFunction<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;
export type CreateCourseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateCourseMutation, CreateCourseMutationVariables>,
  "mutation"
>;

export const CreateCourseComponent = (props: CreateCourseComponentProps) => (
  <ApolloReactComponents.Mutation<CreateCourseMutation, CreateCourseMutationVariables>
    mutation={CreateCourseDocument}
    {...props}
  />
);

export type CreateCourseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;
} & TChildProps;
export function withCreateCourse<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCourseMutation,
    CreateCourseMutationVariables,
    CreateCourseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCourseMutation,
    CreateCourseMutationVariables,
    CreateCourseProps<TChildProps, TDataName>
  >(CreateCourseDocument, {
    alias: "createCourse",
    ...operationOptions,
  });
}
export type CreateCourseMutationResult = ApolloReactCommon.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;
export const RemoveCourseDocument = gql`
  mutation removeCourse($id: String!) {
    removeCourse(id: $id) {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type RemoveCourseMutationFn = ApolloReactCommon.MutationFunction<
  RemoveCourseMutation,
  RemoveCourseMutationVariables
>;
export type RemoveCourseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveCourseMutation, RemoveCourseMutationVariables>,
  "mutation"
>;

export const RemoveCourseComponent = (props: RemoveCourseComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveCourseMutation, RemoveCourseMutationVariables>
    mutation={RemoveCourseDocument}
    {...props}
  />
);

export type RemoveCourseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveCourseMutation, RemoveCourseMutationVariables>;
} & TChildProps;
export function withRemoveCourse<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveCourseMutation,
    RemoveCourseMutationVariables,
    RemoveCourseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveCourseMutation,
    RemoveCourseMutationVariables,
    RemoveCourseProps<TChildProps, TDataName>
  >(RemoveCourseDocument, {
    alias: "removeCourse",
    ...operationOptions,
  });
}
export type RemoveCourseMutationResult = ApolloReactCommon.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveCourseMutation,
  RemoveCourseMutationVariables
>;
export const RestoreCourseDocument = gql`
  mutation restoreCourse($id: String!) {
    restoreCourse(id: $id) {
      ...coursesAllFields
    }
  }
  ${CoursesAllFieldsFragmentDoc}
`;
export type RestoreCourseMutationFn = ApolloReactCommon.MutationFunction<
  RestoreCourseMutation,
  RestoreCourseMutationVariables
>;
export type RestoreCourseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreCourseMutation, RestoreCourseMutationVariables>,
  "mutation"
>;

export const RestoreCourseComponent = (props: RestoreCourseComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreCourseMutation, RestoreCourseMutationVariables>
    mutation={RestoreCourseDocument}
    {...props}
  />
);

export type RestoreCourseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreCourseMutation, RestoreCourseMutationVariables>;
} & TChildProps;
export function withRestoreCourse<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreCourseMutation,
    RestoreCourseMutationVariables,
    RestoreCourseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreCourseMutation,
    RestoreCourseMutationVariables,
    RestoreCourseProps<TChildProps, TDataName>
  >(RestoreCourseDocument, {
    alias: "restoreCourse",
    ...operationOptions,
  });
}
export type RestoreCourseMutationResult = ApolloReactCommon.MutationResult<RestoreCourseMutation>;
export type RestoreCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreCourseMutation,
  RestoreCourseMutationVariables
>;
export const GetGuardsDocument = gql`
  query getGuards {
    guards {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type GetGuardsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetGuardsQuery, GetGuardsQueryVariables>,
  "query"
>;

export const GetGuardsComponent = (props: GetGuardsComponentProps) => (
  <ApolloReactComponents.Query<GetGuardsQuery, GetGuardsQueryVariables> query={GetGuardsDocument} {...props} />
);

export type GetGuardsProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetGuardsQuery, GetGuardsQueryVariables>;
} & TChildProps;
export function withGetGuards<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetGuardsQuery,
    GetGuardsQueryVariables,
    GetGuardsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetGuardsQuery,
    GetGuardsQueryVariables,
    GetGuardsProps<TChildProps, TDataName>
  >(GetGuardsDocument, {
    alias: "getGuards",
    ...operationOptions,
  });
}
export type GetGuardsQueryResult = ApolloReactCommon.QueryResult<GetGuardsQuery, GetGuardsQueryVariables>;
export const CurrentGuardDocument = gql`
  query currentGuard {
    currentGuard {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type CurrentGuardComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<CurrentGuardQuery, CurrentGuardQueryVariables>,
  "query"
>;

export const CurrentGuardComponent = (props: CurrentGuardComponentProps) => (
  <ApolloReactComponents.Query<CurrentGuardQuery, CurrentGuardQueryVariables> query={CurrentGuardDocument} {...props} />
);

export type CurrentGuardProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<CurrentGuardQuery, CurrentGuardQueryVariables>;
} & TChildProps;
export function withCurrentGuard<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CurrentGuardQuery,
    CurrentGuardQueryVariables,
    CurrentGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CurrentGuardQuery,
    CurrentGuardQueryVariables,
    CurrentGuardProps<TChildProps, TDataName>
  >(CurrentGuardDocument, {
    alias: "currentGuard",
    ...operationOptions,
  });
}
export type CurrentGuardQueryResult = ApolloReactCommon.QueryResult<CurrentGuardQuery, CurrentGuardQueryVariables>;
export const NextGuardDocument = gql`
  query nextGuard {
    nextGuard {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type NextGuardComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<NextGuardQuery, NextGuardQueryVariables>,
  "query"
>;

export const NextGuardComponent = (props: NextGuardComponentProps) => (
  <ApolloReactComponents.Query<NextGuardQuery, NextGuardQueryVariables> query={NextGuardDocument} {...props} />
);

export type NextGuardProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<NextGuardQuery, NextGuardQueryVariables>;
} & TChildProps;
export function withNextGuard<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    NextGuardQuery,
    NextGuardQueryVariables,
    NextGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    NextGuardQuery,
    NextGuardQueryVariables,
    NextGuardProps<TChildProps, TDataName>
  >(NextGuardDocument, {
    alias: "nextGuard",
    ...operationOptions,
  });
}
export type NextGuardQueryResult = ApolloReactCommon.QueryResult<NextGuardQuery, NextGuardQueryVariables>;
export const GetGuardsDisabledDocument = gql`
  query getGuardsDisabled {
    guardsDisabled {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type GetGuardsDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetGuardsDisabledQuery, GetGuardsDisabledQueryVariables>,
  "query"
>;

export const GetGuardsDisabledComponent = (props: GetGuardsDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetGuardsDisabledQuery, GetGuardsDisabledQueryVariables>
    query={GetGuardsDisabledDocument}
    {...props}
  />
);

export type GetGuardsDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetGuardsDisabledQuery, GetGuardsDisabledQueryVariables>;
} & TChildProps;
export function withGetGuardsDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetGuardsDisabledQuery,
    GetGuardsDisabledQueryVariables,
    GetGuardsDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetGuardsDisabledQuery,
    GetGuardsDisabledQueryVariables,
    GetGuardsDisabledProps<TChildProps, TDataName>
  >(GetGuardsDisabledDocument, {
    alias: "getGuardsDisabled",
    ...operationOptions,
  });
}
export type GetGuardsDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetGuardsDisabledQuery,
  GetGuardsDisabledQueryVariables
>;
export const FindGuardDocument = gql`
  query findGuard($id: String!) {
    guard(id: $id) {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type FindGuardComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindGuardQuery, FindGuardQueryVariables>,
  "query"
> &
  ({ variables: FindGuardQueryVariables; skip?: boolean } | { skip: boolean });

export const FindGuardComponent = (props: FindGuardComponentProps) => (
  <ApolloReactComponents.Query<FindGuardQuery, FindGuardQueryVariables> query={FindGuardDocument} {...props} />
);

export type FindGuardProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindGuardQuery, FindGuardQueryVariables>;
} & TChildProps;
export function withFindGuard<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindGuardQuery,
    FindGuardQueryVariables,
    FindGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindGuardQuery,
    FindGuardQueryVariables,
    FindGuardProps<TChildProps, TDataName>
  >(FindGuardDocument, {
    alias: "findGuard",
    ...operationOptions,
  });
}
export type FindGuardQueryResult = ApolloReactCommon.QueryResult<FindGuardQuery, FindGuardQueryVariables>;
export const EditGuardDocument = gql`
  mutation editGuard($input: UpdateGuardInput!) {
    updateGuard(updateGuardInput: $input) {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type EditGuardMutationFn = ApolloReactCommon.MutationFunction<EditGuardMutation, EditGuardMutationVariables>;
export type EditGuardComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditGuardMutation, EditGuardMutationVariables>,
  "mutation"
>;

export const EditGuardComponent = (props: EditGuardComponentProps) => (
  <ApolloReactComponents.Mutation<EditGuardMutation, EditGuardMutationVariables>
    mutation={EditGuardDocument}
    {...props}
  />
);

export type EditGuardProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditGuardMutation, EditGuardMutationVariables>;
} & TChildProps;
export function withEditGuard<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditGuardMutation,
    EditGuardMutationVariables,
    EditGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditGuardMutation,
    EditGuardMutationVariables,
    EditGuardProps<TChildProps, TDataName>
  >(EditGuardDocument, {
    alias: "editGuard",
    ...operationOptions,
  });
}
export type EditGuardMutationResult = ApolloReactCommon.MutationResult<EditGuardMutation>;
export type EditGuardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditGuardMutation,
  EditGuardMutationVariables
>;
export const CreateGuardDocument = gql`
  mutation createGuard($input: CreateGuardInput!) {
    createGuard(createGuardInput: $input) {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type CreateGuardMutationFn = ApolloReactCommon.MutationFunction<
  CreateGuardMutation,
  CreateGuardMutationVariables
>;
export type CreateGuardComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateGuardMutation, CreateGuardMutationVariables>,
  "mutation"
>;

export const CreateGuardComponent = (props: CreateGuardComponentProps) => (
  <ApolloReactComponents.Mutation<CreateGuardMutation, CreateGuardMutationVariables>
    mutation={CreateGuardDocument}
    {...props}
  />
);

export type CreateGuardProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateGuardMutation, CreateGuardMutationVariables>;
} & TChildProps;
export function withCreateGuard<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateGuardMutation,
    CreateGuardMutationVariables,
    CreateGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateGuardMutation,
    CreateGuardMutationVariables,
    CreateGuardProps<TChildProps, TDataName>
  >(CreateGuardDocument, {
    alias: "createGuard",
    ...operationOptions,
  });
}
export type CreateGuardMutationResult = ApolloReactCommon.MutationResult<CreateGuardMutation>;
export type CreateGuardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGuardMutation,
  CreateGuardMutationVariables
>;
export const RemoveGuardDocument = gql`
  mutation removeGuard($id: String!) {
    removeGuard(id: $id) {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type RemoveGuardMutationFn = ApolloReactCommon.MutationFunction<
  RemoveGuardMutation,
  RemoveGuardMutationVariables
>;
export type RemoveGuardComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveGuardMutation, RemoveGuardMutationVariables>,
  "mutation"
>;

export const RemoveGuardComponent = (props: RemoveGuardComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveGuardMutation, RemoveGuardMutationVariables>
    mutation={RemoveGuardDocument}
    {...props}
  />
);

export type RemoveGuardProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveGuardMutation, RemoveGuardMutationVariables>;
} & TChildProps;
export function withRemoveGuard<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveGuardMutation,
    RemoveGuardMutationVariables,
    RemoveGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveGuardMutation,
    RemoveGuardMutationVariables,
    RemoveGuardProps<TChildProps, TDataName>
  >(RemoveGuardDocument, {
    alias: "removeGuard",
    ...operationOptions,
  });
}
export type RemoveGuardMutationResult = ApolloReactCommon.MutationResult<RemoveGuardMutation>;
export type RemoveGuardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveGuardMutation,
  RemoveGuardMutationVariables
>;
export const RestoreGuardDocument = gql`
  mutation restoreGuard($id: String!) {
    restoreGuard(id: $id) {
      ...guardAllFields
    }
  }
  ${GuardAllFieldsFragmentDoc}
`;
export type RestoreGuardMutationFn = ApolloReactCommon.MutationFunction<
  RestoreGuardMutation,
  RestoreGuardMutationVariables
>;
export type RestoreGuardComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreGuardMutation, RestoreGuardMutationVariables>,
  "mutation"
>;

export const RestoreGuardComponent = (props: RestoreGuardComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreGuardMutation, RestoreGuardMutationVariables>
    mutation={RestoreGuardDocument}
    {...props}
  />
);

export type RestoreGuardProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreGuardMutation, RestoreGuardMutationVariables>;
} & TChildProps;
export function withRestoreGuard<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreGuardMutation,
    RestoreGuardMutationVariables,
    RestoreGuardProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreGuardMutation,
    RestoreGuardMutationVariables,
    RestoreGuardProps<TChildProps, TDataName>
  >(RestoreGuardDocument, {
    alias: "restoreGuard",
    ...operationOptions,
  });
}
export type RestoreGuardMutationResult = ApolloReactCommon.MutationResult<RestoreGuardMutation>;
export type RestoreGuardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreGuardMutation,
  RestoreGuardMutationVariables
>;
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      access_token
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>,
  "mutation"
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
);

export type LoginProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
} & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(
    LoginDocument,
    {
      alias: "login",
      ...operationOptions,
    }
  );
}
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    currentUser {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type GetCurrentUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
  "query"
>;

export const GetCurrentUserComponent = (props: GetCurrentUserComponentProps) => (
  <ApolloReactComponents.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables>
    query={GetCurrentUserDocument}
    {...props}
  />
);

export type GetCurrentUserProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
} & TChildProps;
export function withGetCurrentUser<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
    GetCurrentUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
    GetCurrentUserProps<TChildProps, TDataName>
  >(GetCurrentUserDocument, {
    alias: "getCurrentUser",
    ...operationOptions,
  });
}
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const GetReportDocument = gql`
  query getReport($startDate: Float!, $endDate: Float!) {
    report(startDate: $startDate, endDate: $endDate) {
      ...reportAllFields
    }
  }
  ${ReportAllFieldsFragmentDoc}
`;
export type GetReportComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetReportQuery, GetReportQueryVariables>,
  "query"
> &
  ({ variables: GetReportQueryVariables; skip?: boolean } | { skip: boolean });

export const GetReportComponent = (props: GetReportComponentProps) => (
  <ApolloReactComponents.Query<GetReportQuery, GetReportQueryVariables> query={GetReportDocument} {...props} />
);

export type GetReportProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetReportQuery, GetReportQueryVariables>;
} & TChildProps;
export function withGetReport<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetReportQuery,
    GetReportQueryVariables,
    GetReportProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetReportQuery,
    GetReportQueryVariables,
    GetReportProps<TChildProps, TDataName>
  >(GetReportDocument, {
    alias: "getReport",
    ...operationOptions,
  });
}
export type GetReportQueryResult = ApolloReactCommon.QueryResult<GetReportQuery, GetReportQueryVariables>;
export const GetTrainingsDocument = gql`
  query getTrainings {
    trainings {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type GetTrainingsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetTrainingsQuery, GetTrainingsQueryVariables>,
  "query"
>;

export const GetTrainingsComponent = (props: GetTrainingsComponentProps) => (
  <ApolloReactComponents.Query<GetTrainingsQuery, GetTrainingsQueryVariables> query={GetTrainingsDocument} {...props} />
);

export type GetTrainingsProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetTrainingsQuery, GetTrainingsQueryVariables>;
} & TChildProps;
export function withGetTrainings<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetTrainingsQuery,
    GetTrainingsQueryVariables,
    GetTrainingsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetTrainingsQuery,
    GetTrainingsQueryVariables,
    GetTrainingsProps<TChildProps, TDataName>
  >(GetTrainingsDocument, {
    alias: "getTrainings",
    ...operationOptions,
  });
}
export type GetTrainingsQueryResult = ApolloReactCommon.QueryResult<GetTrainingsQuery, GetTrainingsQueryVariables>;
export const GetTrainingsDisabledDocument = gql`
  query getTrainingsDisabled {
    trainingsDisabled {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type GetTrainingsDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetTrainingsDisabledQuery, GetTrainingsDisabledQueryVariables>,
  "query"
>;

export const GetTrainingsDisabledComponent = (props: GetTrainingsDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetTrainingsDisabledQuery, GetTrainingsDisabledQueryVariables>
    query={GetTrainingsDisabledDocument}
    {...props}
  />
);

export type GetTrainingsDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetTrainingsDisabledQuery, GetTrainingsDisabledQueryVariables>;
} & TChildProps;
export function withGetTrainingsDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetTrainingsDisabledQuery,
    GetTrainingsDisabledQueryVariables,
    GetTrainingsDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetTrainingsDisabledQuery,
    GetTrainingsDisabledQueryVariables,
    GetTrainingsDisabledProps<TChildProps, TDataName>
  >(GetTrainingsDisabledDocument, {
    alias: "getTrainingsDisabled",
    ...operationOptions,
  });
}
export type GetTrainingsDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetTrainingsDisabledQuery,
  GetTrainingsDisabledQueryVariables
>;
export const FindTrainingDocument = gql`
  query findTraining($id: String!) {
    training(id: $id) {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type FindTrainingComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindTrainingQuery, FindTrainingQueryVariables>,
  "query"
> &
  ({ variables: FindTrainingQueryVariables; skip?: boolean } | { skip: boolean });

export const FindTrainingComponent = (props: FindTrainingComponentProps) => (
  <ApolloReactComponents.Query<FindTrainingQuery, FindTrainingQueryVariables> query={FindTrainingDocument} {...props} />
);

export type FindTrainingProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindTrainingQuery, FindTrainingQueryVariables>;
} & TChildProps;
export function withFindTraining<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindTrainingQuery,
    FindTrainingQueryVariables,
    FindTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindTrainingQuery,
    FindTrainingQueryVariables,
    FindTrainingProps<TChildProps, TDataName>
  >(FindTrainingDocument, {
    alias: "findTraining",
    ...operationOptions,
  });
}
export type FindTrainingQueryResult = ApolloReactCommon.QueryResult<FindTrainingQuery, FindTrainingQueryVariables>;
export const EditTrainingDocument = gql`
  mutation editTraining($input: UpdateTrainingInput!) {
    updateTraining(updateTrainingInput: $input) {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type EditTrainingMutationFn = ApolloReactCommon.MutationFunction<
  EditTrainingMutation,
  EditTrainingMutationVariables
>;
export type EditTrainingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditTrainingMutation, EditTrainingMutationVariables>,
  "mutation"
>;

export const EditTrainingComponent = (props: EditTrainingComponentProps) => (
  <ApolloReactComponents.Mutation<EditTrainingMutation, EditTrainingMutationVariables>
    mutation={EditTrainingDocument}
    {...props}
  />
);

export type EditTrainingProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditTrainingMutation, EditTrainingMutationVariables>;
} & TChildProps;
export function withEditTraining<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditTrainingMutation,
    EditTrainingMutationVariables,
    EditTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditTrainingMutation,
    EditTrainingMutationVariables,
    EditTrainingProps<TChildProps, TDataName>
  >(EditTrainingDocument, {
    alias: "editTraining",
    ...operationOptions,
  });
}
export type EditTrainingMutationResult = ApolloReactCommon.MutationResult<EditTrainingMutation>;
export type EditTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditTrainingMutation,
  EditTrainingMutationVariables
>;
export const CreateTrainingDocument = gql`
  mutation createTraining($input: CreateTrainingInput!) {
    createTraining(createTrainingInput: $input) {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type CreateTrainingMutationFn = ApolloReactCommon.MutationFunction<
  CreateTrainingMutation,
  CreateTrainingMutationVariables
>;
export type CreateTrainingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateTrainingMutation, CreateTrainingMutationVariables>,
  "mutation"
>;

export const CreateTrainingComponent = (props: CreateTrainingComponentProps) => (
  <ApolloReactComponents.Mutation<CreateTrainingMutation, CreateTrainingMutationVariables>
    mutation={CreateTrainingDocument}
    {...props}
  />
);

export type CreateTrainingProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateTrainingMutation, CreateTrainingMutationVariables>;
} & TChildProps;
export function withCreateTraining<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateTrainingMutation,
    CreateTrainingMutationVariables,
    CreateTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateTrainingMutation,
    CreateTrainingMutationVariables,
    CreateTrainingProps<TChildProps, TDataName>
  >(CreateTrainingDocument, {
    alias: "createTraining",
    ...operationOptions,
  });
}
export type CreateTrainingMutationResult = ApolloReactCommon.MutationResult<CreateTrainingMutation>;
export type CreateTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTrainingMutation,
  CreateTrainingMutationVariables
>;
export const RemoveTrainingDocument = gql`
  mutation removeTraining($id: String!) {
    removeTraining(id: $id) {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type RemoveTrainingMutationFn = ApolloReactCommon.MutationFunction<
  RemoveTrainingMutation,
  RemoveTrainingMutationVariables
>;
export type RemoveTrainingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveTrainingMutation, RemoveTrainingMutationVariables>,
  "mutation"
>;

export const RemoveTrainingComponent = (props: RemoveTrainingComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveTrainingMutation, RemoveTrainingMutationVariables>
    mutation={RemoveTrainingDocument}
    {...props}
  />
);

export type RemoveTrainingProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveTrainingMutation, RemoveTrainingMutationVariables>;
} & TChildProps;
export function withRemoveTraining<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveTrainingMutation,
    RemoveTrainingMutationVariables,
    RemoveTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveTrainingMutation,
    RemoveTrainingMutationVariables,
    RemoveTrainingProps<TChildProps, TDataName>
  >(RemoveTrainingDocument, {
    alias: "removeTraining",
    ...operationOptions,
  });
}
export type RemoveTrainingMutationResult = ApolloReactCommon.MutationResult<RemoveTrainingMutation>;
export type RemoveTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveTrainingMutation,
  RemoveTrainingMutationVariables
>;
export const RestoreTrainingDocument = gql`
  mutation restoreTraining($id: String!) {
    restoreTraining(id: $id) {
      ...trainingAllFields
    }
  }
  ${TrainingAllFieldsFragmentDoc}
`;
export type RestoreTrainingMutationFn = ApolloReactCommon.MutationFunction<
  RestoreTrainingMutation,
  RestoreTrainingMutationVariables
>;
export type RestoreTrainingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreTrainingMutation, RestoreTrainingMutationVariables>,
  "mutation"
>;

export const RestoreTrainingComponent = (props: RestoreTrainingComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreTrainingMutation, RestoreTrainingMutationVariables>
    mutation={RestoreTrainingDocument}
    {...props}
  />
);

export type RestoreTrainingProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreTrainingMutation, RestoreTrainingMutationVariables>;
} & TChildProps;
export function withRestoreTraining<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreTrainingMutation,
    RestoreTrainingMutationVariables,
    RestoreTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreTrainingMutation,
    RestoreTrainingMutationVariables,
    RestoreTrainingProps<TChildProps, TDataName>
  >(RestoreTrainingDocument, {
    alias: "restoreTraining",
    ...operationOptions,
  });
}
export type RestoreTrainingMutationResult = ApolloReactCommon.MutationResult<RestoreTrainingMutation>;
export type RestoreTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreTrainingMutation,
  RestoreTrainingMutationVariables
>;
export const GetUsersDocument = gql`
  query getUsers {
    users {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type GetUsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetUsersQuery, GetUsersQueryVariables>,
  "query"
>;

export const GetUsersComponent = (props: GetUsersComponentProps) => (
  <ApolloReactComponents.Query<GetUsersQuery, GetUsersQueryVariables> query={GetUsersDocument} {...props} />
);

export type GetUsersProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetUsersQuery, GetUsersQueryVariables>;
} & TChildProps;
export function withGetUsers<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetUsersQuery,
    GetUsersQueryVariables,
    GetUsersProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetUsersQuery, GetUsersQueryVariables, GetUsersProps<TChildProps, TDataName>>(
    GetUsersDocument,
    {
      alias: "getUsers",
      ...operationOptions,
    }
  );
}
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUsersDisabledDocument = gql`
  query getUsersDisabled {
    usersDisabled {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type GetUsersDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetUsersDisabledQuery, GetUsersDisabledQueryVariables>,
  "query"
>;

export const GetUsersDisabledComponent = (props: GetUsersDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetUsersDisabledQuery, GetUsersDisabledQueryVariables>
    query={GetUsersDisabledDocument}
    {...props}
  />
);

export type GetUsersDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetUsersDisabledQuery, GetUsersDisabledQueryVariables>;
} & TChildProps;
export function withGetUsersDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetUsersDisabledQuery,
    GetUsersDisabledQueryVariables,
    GetUsersDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetUsersDisabledQuery,
    GetUsersDisabledQueryVariables,
    GetUsersDisabledProps<TChildProps, TDataName>
  >(GetUsersDisabledDocument, {
    alias: "getUsersDisabled",
    ...operationOptions,
  });
}
export type GetUsersDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetUsersDisabledQuery,
  GetUsersDisabledQueryVariables
>;
export const FindUserDocument = gql`
  query findUser($id: String!) {
    user(id: $id) {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type FindUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindUserQuery, FindUserQueryVariables>,
  "query"
> &
  ({ variables: FindUserQueryVariables; skip?: boolean } | { skip: boolean });

export const FindUserComponent = (props: FindUserComponentProps) => (
  <ApolloReactComponents.Query<FindUserQuery, FindUserQueryVariables> query={FindUserDocument} {...props} />
);

export type FindUserProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindUserQuery, FindUserQueryVariables>;
} & TChildProps;
export function withFindUser<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindUserQuery,
    FindUserQueryVariables,
    FindUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, FindUserQuery, FindUserQueryVariables, FindUserProps<TChildProps, TDataName>>(
    FindUserDocument,
    {
      alias: "findUser",
      ...operationOptions,
    }
  );
}
export type FindUserQueryResult = ApolloReactCommon.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const EditUserDocument = gql`
  mutation editUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type EditUserMutationFn = ApolloReactCommon.MutationFunction<EditUserMutation, EditUserMutationVariables>;
export type EditUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditUserMutation, EditUserMutationVariables>,
  "mutation"
>;

export const EditUserComponent = (props: EditUserComponentProps) => (
  <ApolloReactComponents.Mutation<EditUserMutation, EditUserMutationVariables> mutation={EditUserDocument} {...props} />
);

export type EditUserProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditUserMutation, EditUserMutationVariables>;
} & TChildProps;
export function withEditUser<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditUserMutation,
    EditUserMutationVariables,
    EditUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditUserMutation,
    EditUserMutationVariables,
    EditUserProps<TChildProps, TDataName>
  >(EditUserDocument, {
    alias: "editUser",
    ...operationOptions,
  });
}
export type EditUserMutationResult = ApolloReactCommon.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>,
  "mutation"
>;

export const CreateUserComponent = (props: CreateUserComponentProps) => (
  <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables>
    mutation={CreateUserDocument}
    {...props}
  />
);

export type CreateUserProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
} & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps, TDataName>
  >(CreateUserDocument, {
    alias: "createUser",
    ...operationOptions,
  });
}
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const RemoveUserDocument = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type RemoveUserMutationFn = ApolloReactCommon.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;
export type RemoveUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveUserMutation, RemoveUserMutationVariables>,
  "mutation"
>;

export const RemoveUserComponent = (props: RemoveUserComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveUserMutation, RemoveUserMutationVariables>
    mutation={RemoveUserDocument}
    {...props}
  />
);

export type RemoveUserProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;
} & TChildProps;
export function withRemoveUser<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveUserMutation,
    RemoveUserMutationVariables,
    RemoveUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveUserMutation,
    RemoveUserMutationVariables,
    RemoveUserProps<TChildProps, TDataName>
  >(RemoveUserDocument, {
    alias: "removeUser",
    ...operationOptions,
  });
}
export type RemoveUserMutationResult = ApolloReactCommon.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveUserMutation,
  RemoveUserMutationVariables
>;
export const RestoreUserDocument = gql`
  mutation restoreUser($id: String!) {
    restoreUser(id: $id) {
      ...userAllFields
    }
  }
  ${UserAllFieldsFragmentDoc}
`;
export type RestoreUserMutationFn = ApolloReactCommon.MutationFunction<
  RestoreUserMutation,
  RestoreUserMutationVariables
>;
export type RestoreUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreUserMutation, RestoreUserMutationVariables>,
  "mutation"
>;

export const RestoreUserComponent = (props: RestoreUserComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreUserMutation, RestoreUserMutationVariables>
    mutation={RestoreUserDocument}
    {...props}
  />
);

export type RestoreUserProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreUserMutation, RestoreUserMutationVariables>;
} & TChildProps;
export function withRestoreUser<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreUserMutation,
    RestoreUserMutationVariables,
    RestoreUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreUserMutation,
    RestoreUserMutationVariables,
    RestoreUserProps<TChildProps, TDataName>
  >(RestoreUserDocument, {
    alias: "restoreUser",
    ...operationOptions,
  });
}
export type RestoreUserMutationResult = ApolloReactCommon.MutationResult<RestoreUserMutation>;
export type RestoreUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreUserMutation,
  RestoreUserMutationVariables
>;
export const GetDutiesDocument = gql`
  query getDuties {
    duties {
      ...dutyAllFields
    }
  }
  ${DutyAllFieldsFragmentDoc}
`;
export type GetDutiesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetDutiesQuery, GetDutiesQueryVariables>,
  "query"
>;

export const GetDutiesComponent = (props: GetDutiesComponentProps) => (
  <ApolloReactComponents.Query<GetDutiesQuery, GetDutiesQueryVariables> query={GetDutiesDocument} {...props} />
);

export type GetDutiesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetDutiesQuery, GetDutiesQueryVariables>;
} & TChildProps;
export function withGetDuties<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetDutiesQuery,
    GetDutiesQueryVariables,
    GetDutiesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetDutiesQuery,
    GetDutiesQueryVariables,
    GetDutiesProps<TChildProps, TDataName>
  >(GetDutiesDocument, {
    alias: "getDuties",
    ...operationOptions,
  });
}
export type GetDutiesQueryResult = ApolloReactCommon.QueryResult<GetDutiesQuery, GetDutiesQueryVariables>;
export const GetDutiesDisabledDocument = gql`
  query getDutiesDisabled {
    dutiesDisabled {
      ...dutyAllFields
    }
  }
  ${DutyAllFieldsFragmentDoc}
`;
export type GetDutiesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetDutiesDisabledQuery, GetDutiesDisabledQueryVariables>,
  "query"
>;

export const GetDutiesDisabledComponent = (props: GetDutiesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetDutiesDisabledQuery, GetDutiesDisabledQueryVariables>
    query={GetDutiesDisabledDocument}
    {...props}
  />
);

export type GetDutiesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetDutiesDisabledQuery, GetDutiesDisabledQueryVariables>;
} & TChildProps;
export function withGetDutiesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetDutiesDisabledQuery,
    GetDutiesDisabledQueryVariables,
    GetDutiesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetDutiesDisabledQuery,
    GetDutiesDisabledQueryVariables,
    GetDutiesDisabledProps<TChildProps, TDataName>
  >(GetDutiesDisabledDocument, {
    alias: "getDutiesDisabled",
    ...operationOptions,
  });
}
export type GetDutiesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetDutiesDisabledQuery,
  GetDutiesDisabledQueryVariables
>;
export const FindDutyDocument = gql`
  query findDuty($id: String!) {
    duty(id: $id) {
      ...dutyAllFields
    }
  }
  ${DutyAllFieldsFragmentDoc}
`;
export type FindDutyComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindDutyQuery, FindDutyQueryVariables>,
  "query"
> &
  ({ variables: FindDutyQueryVariables; skip?: boolean } | { skip: boolean });

export const FindDutyComponent = (props: FindDutyComponentProps) => (
  <ApolloReactComponents.Query<FindDutyQuery, FindDutyQueryVariables> query={FindDutyDocument} {...props} />
);

export type FindDutyProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindDutyQuery, FindDutyQueryVariables>;
} & TChildProps;
export function withFindDuty<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindDutyQuery,
    FindDutyQueryVariables,
    FindDutyProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, FindDutyQuery, FindDutyQueryVariables, FindDutyProps<TChildProps, TDataName>>(
    FindDutyDocument,
    {
      alias: "findDuty",
      ...operationOptions,
    }
  );
}
export type FindDutyQueryResult = ApolloReactCommon.QueryResult<FindDutyQuery, FindDutyQueryVariables>;
export const EditDutyDocument = gql`
  mutation editDuty($input: UpdateDutyInput!) {
    updateDuty(updateDutyInput: $input) {
      ...dutyAllFields
    }
  }
  ${DutyAllFieldsFragmentDoc}
`;
export type EditDutyMutationFn = ApolloReactCommon.MutationFunction<EditDutyMutation, EditDutyMutationVariables>;
export type EditDutyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditDutyMutation, EditDutyMutationVariables>,
  "mutation"
>;

export const EditDutyComponent = (props: EditDutyComponentProps) => (
  <ApolloReactComponents.Mutation<EditDutyMutation, EditDutyMutationVariables> mutation={EditDutyDocument} {...props} />
);

export type EditDutyProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditDutyMutation, EditDutyMutationVariables>;
} & TChildProps;
export function withEditDuty<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditDutyMutation,
    EditDutyMutationVariables,
    EditDutyProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditDutyMutation,
    EditDutyMutationVariables,
    EditDutyProps<TChildProps, TDataName>
  >(EditDutyDocument, {
    alias: "editDuty",
    ...operationOptions,
  });
}
export type EditDutyMutationResult = ApolloReactCommon.MutationResult<EditDutyMutation>;
export type EditDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditDutyMutation,
  EditDutyMutationVariables
>;
export const CreateDutyDocument = gql`
  mutation createDuty($input: CreateDutyInput!) {
    createDuty(createDutyInput: $input) {
      ...dutyAllFields
    }
  }
  ${DutyAllFieldsFragmentDoc}
`;
export type CreateDutyMutationFn = ApolloReactCommon.MutationFunction<CreateDutyMutation, CreateDutyMutationVariables>;
export type CreateDutyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateDutyMutation, CreateDutyMutationVariables>,
  "mutation"
>;

export const CreateDutyComponent = (props: CreateDutyComponentProps) => (
  <ApolloReactComponents.Mutation<CreateDutyMutation, CreateDutyMutationVariables>
    mutation={CreateDutyDocument}
    {...props}
  />
);

export type CreateDutyProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateDutyMutation, CreateDutyMutationVariables>;
} & TChildProps;
export function withCreateDuty<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateDutyMutation,
    CreateDutyMutationVariables,
    CreateDutyProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateDutyMutation,
    CreateDutyMutationVariables,
    CreateDutyProps<TChildProps, TDataName>
  >(CreateDutyDocument, {
    alias: "createDuty",
    ...operationOptions,
  });
}
export type CreateDutyMutationResult = ApolloReactCommon.MutationResult<CreateDutyMutation>;
export type CreateDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateDutyMutation,
  CreateDutyMutationVariables
>;
export const DeleteDutyDocument = gql`
  mutation deleteDuty($id: String!) {
    removeDuty(id: $id) {
      id
    }
  }
`;
export type DeleteDutyMutationFn = ApolloReactCommon.MutationFunction<DeleteDutyMutation, DeleteDutyMutationVariables>;
export type DeleteDutyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteDutyMutation, DeleteDutyMutationVariables>,
  "mutation"
>;

export const DeleteDutyComponent = (props: DeleteDutyComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteDutyMutation, DeleteDutyMutationVariables>
    mutation={DeleteDutyDocument}
    {...props}
  />
);

export type DeleteDutyProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteDutyMutation, DeleteDutyMutationVariables>;
} & TChildProps;
export function withDeleteDuty<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteDutyMutation,
    DeleteDutyMutationVariables,
    DeleteDutyProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteDutyMutation,
    DeleteDutyMutationVariables,
    DeleteDutyProps<TChildProps, TDataName>
  >(DeleteDutyDocument, {
    alias: "deleteDuty",
    ...operationOptions,
  });
}
export type DeleteDutyMutationResult = ApolloReactCommon.MutationResult<DeleteDutyMutation>;
export type DeleteDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteDutyMutation,
  DeleteDutyMutationVariables
>;
export const RestoreDutyDocument = gql`
  mutation restoreDuty($id: String!) {
    restoreDuty(id: $id) {
      id
    }
  }
`;
export type RestoreDutyMutationFn = ApolloReactCommon.MutationFunction<
  RestoreDutyMutation,
  RestoreDutyMutationVariables
>;
export type RestoreDutyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreDutyMutation, RestoreDutyMutationVariables>,
  "mutation"
>;

export const RestoreDutyComponent = (props: RestoreDutyComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreDutyMutation, RestoreDutyMutationVariables>
    mutation={RestoreDutyDocument}
    {...props}
  />
);

export type RestoreDutyProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreDutyMutation, RestoreDutyMutationVariables>;
} & TChildProps;
export function withRestoreDuty<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreDutyMutation,
    RestoreDutyMutationVariables,
    RestoreDutyProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreDutyMutation,
    RestoreDutyMutationVariables,
    RestoreDutyProps<TChildProps, TDataName>
  >(RestoreDutyDocument, {
    alias: "restoreDuty",
    ...operationOptions,
  });
}
export type RestoreDutyMutationResult = ApolloReactCommon.MutationResult<RestoreDutyMutation>;
export type RestoreDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreDutyMutation,
  RestoreDutyMutationVariables
>;
export const GetEventsDocument = gql`
  query getEvents {
    events {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type GetEventsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetEventsQuery, GetEventsQueryVariables>,
  "query"
>;

export const GetEventsComponent = (props: GetEventsComponentProps) => (
  <ApolloReactComponents.Query<GetEventsQuery, GetEventsQueryVariables> query={GetEventsDocument} {...props} />
);

export type GetEventsProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetEventsQuery, GetEventsQueryVariables>;
} & TChildProps;
export function withGetEvents<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetEventsQuery,
    GetEventsQueryVariables,
    GetEventsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetEventsQuery,
    GetEventsQueryVariables,
    GetEventsProps<TChildProps, TDataName>
  >(GetEventsDocument, {
    alias: "getEvents",
    ...operationOptions,
  });
}
export type GetEventsQueryResult = ApolloReactCommon.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventsDisabledDocument = gql`
  query getEventsDisabled {
    eventsDisabled {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type GetEventsDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetEventsDisabledQuery, GetEventsDisabledQueryVariables>,
  "query"
>;

export const GetEventsDisabledComponent = (props: GetEventsDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetEventsDisabledQuery, GetEventsDisabledQueryVariables>
    query={GetEventsDisabledDocument}
    {...props}
  />
);

export type GetEventsDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetEventsDisabledQuery, GetEventsDisabledQueryVariables>;
} & TChildProps;
export function withGetEventsDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetEventsDisabledQuery,
    GetEventsDisabledQueryVariables,
    GetEventsDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetEventsDisabledQuery,
    GetEventsDisabledQueryVariables,
    GetEventsDisabledProps<TChildProps, TDataName>
  >(GetEventsDisabledDocument, {
    alias: "getEventsDisabled",
    ...operationOptions,
  });
}
export type GetEventsDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetEventsDisabledQuery,
  GetEventsDisabledQueryVariables
>;
export const FindEventDocument = gql`
  query findEvent($id: String!) {
    event(id: $id) {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type FindEventComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindEventQuery, FindEventQueryVariables>,
  "query"
> &
  ({ variables: FindEventQueryVariables; skip?: boolean } | { skip: boolean });

export const FindEventComponent = (props: FindEventComponentProps) => (
  <ApolloReactComponents.Query<FindEventQuery, FindEventQueryVariables> query={FindEventDocument} {...props} />
);

export type FindEventProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindEventQuery, FindEventQueryVariables>;
} & TChildProps;
export function withFindEvent<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindEventQuery,
    FindEventQueryVariables,
    FindEventProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindEventQuery,
    FindEventQueryVariables,
    FindEventProps<TChildProps, TDataName>
  >(FindEventDocument, {
    alias: "findEvent",
    ...operationOptions,
  });
}
export type FindEventQueryResult = ApolloReactCommon.QueryResult<FindEventQuery, FindEventQueryVariables>;
export const EditEventDocument = gql`
  mutation editEvent($input: UpdateEventInput!) {
    updateEvent(updateEventInput: $input) {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type EditEventMutationFn = ApolloReactCommon.MutationFunction<EditEventMutation, EditEventMutationVariables>;
export type EditEventComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditEventMutation, EditEventMutationVariables>,
  "mutation"
>;

export const EditEventComponent = (props: EditEventComponentProps) => (
  <ApolloReactComponents.Mutation<EditEventMutation, EditEventMutationVariables>
    mutation={EditEventDocument}
    {...props}
  />
);

export type EditEventProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditEventMutation, EditEventMutationVariables>;
} & TChildProps;
export function withEditEvent<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditEventMutation,
    EditEventMutationVariables,
    EditEventProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditEventMutation,
    EditEventMutationVariables,
    EditEventProps<TChildProps, TDataName>
  >(EditEventDocument, {
    alias: "editEvent",
    ...operationOptions,
  });
}
export type EditEventMutationResult = ApolloReactCommon.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditEventMutation,
  EditEventMutationVariables
>;
export const CreateEventDocument = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(createEventInput: $input) {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export type CreateEventComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateEventMutation, CreateEventMutationVariables>,
  "mutation"
>;

export const CreateEventComponent = (props: CreateEventComponentProps) => (
  <ApolloReactComponents.Mutation<CreateEventMutation, CreateEventMutationVariables>
    mutation={CreateEventDocument}
    {...props}
  />
);

export type CreateEventProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;
} & TChildProps;
export function withCreateEvent<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateEventMutation,
    CreateEventMutationVariables,
    CreateEventProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateEventMutation,
    CreateEventMutationVariables,
    CreateEventProps<TChildProps, TDataName>
  >(CreateEventDocument, {
    alias: "createEvent",
    ...operationOptions,
  });
}
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export const RemoveEventDocument = gql`
  mutation removeEvent($id: String!) {
    removeEvent(id: $id) {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type RemoveEventMutationFn = ApolloReactCommon.MutationFunction<
  RemoveEventMutation,
  RemoveEventMutationVariables
>;
export type RemoveEventComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveEventMutation, RemoveEventMutationVariables>,
  "mutation"
>;

export const RemoveEventComponent = (props: RemoveEventComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveEventMutation, RemoveEventMutationVariables>
    mutation={RemoveEventDocument}
    {...props}
  />
);

export type RemoveEventProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveEventMutation, RemoveEventMutationVariables>;
} & TChildProps;
export function withRemoveEvent<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveEventMutation,
    RemoveEventMutationVariables,
    RemoveEventProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveEventMutation,
    RemoveEventMutationVariables,
    RemoveEventProps<TChildProps, TDataName>
  >(RemoveEventDocument, {
    alias: "removeEvent",
    ...operationOptions,
  });
}
export type RemoveEventMutationResult = ApolloReactCommon.MutationResult<RemoveEventMutation>;
export type RemoveEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveEventMutation,
  RemoveEventMutationVariables
>;
export const RestoreEventDocument = gql`
  mutation restoreEvent($id: String!) {
    restoreEvent(id: $id) {
      ...eventAllFields
    }
  }
  ${EventAllFieldsFragmentDoc}
`;
export type RestoreEventMutationFn = ApolloReactCommon.MutationFunction<
  RestoreEventMutation,
  RestoreEventMutationVariables
>;
export type RestoreEventComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreEventMutation, RestoreEventMutationVariables>,
  "mutation"
>;

export const RestoreEventComponent = (props: RestoreEventComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreEventMutation, RestoreEventMutationVariables>
    mutation={RestoreEventDocument}
    {...props}
  />
);

export type RestoreEventProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreEventMutation, RestoreEventMutationVariables>;
} & TChildProps;
export function withRestoreEvent<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreEventMutation,
    RestoreEventMutationVariables,
    RestoreEventProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreEventMutation,
    RestoreEventMutationVariables,
    RestoreEventProps<TChildProps, TDataName>
  >(RestoreEventDocument, {
    alias: "restoreEvent",
    ...operationOptions,
  });
}
export type RestoreEventMutationResult = ApolloReactCommon.MutationResult<RestoreEventMutation>;
export type RestoreEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreEventMutation,
  RestoreEventMutationVariables
>;
export const GetFireCausesDocument = gql`
  query getFireCauses {
    fireCauses {
      ...fireCauseAllFields
    }
  }
  ${FireCauseAllFieldsFragmentDoc}
`;
export type GetFireCausesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetFireCausesQuery, GetFireCausesQueryVariables>,
  "query"
>;

export const GetFireCausesComponent = (props: GetFireCausesComponentProps) => (
  <ApolloReactComponents.Query<GetFireCausesQuery, GetFireCausesQueryVariables>
    query={GetFireCausesDocument}
    {...props}
  />
);

export type GetFireCausesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetFireCausesQuery, GetFireCausesQueryVariables>;
} & TChildProps;
export function withGetFireCauses<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetFireCausesQuery,
    GetFireCausesQueryVariables,
    GetFireCausesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetFireCausesQuery,
    GetFireCausesQueryVariables,
    GetFireCausesProps<TChildProps, TDataName>
  >(GetFireCausesDocument, {
    alias: "getFireCauses",
    ...operationOptions,
  });
}
export type GetFireCausesQueryResult = ApolloReactCommon.QueryResult<GetFireCausesQuery, GetFireCausesQueryVariables>;
export const GetFireCausesDisabledDocument = gql`
  query getFireCausesDisabled {
    fireCausesDisabled {
      ...fireCauseAllFields
    }
  }
  ${FireCauseAllFieldsFragmentDoc}
`;
export type GetFireCausesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetFireCausesDisabledQuery, GetFireCausesDisabledQueryVariables>,
  "query"
>;

export const GetFireCausesDisabledComponent = (props: GetFireCausesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetFireCausesDisabledQuery, GetFireCausesDisabledQueryVariables>
    query={GetFireCausesDisabledDocument}
    {...props}
  />
);

export type GetFireCausesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetFireCausesDisabledQuery, GetFireCausesDisabledQueryVariables>;
} & TChildProps;
export function withGetFireCausesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetFireCausesDisabledQuery,
    GetFireCausesDisabledQueryVariables,
    GetFireCausesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetFireCausesDisabledQuery,
    GetFireCausesDisabledQueryVariables,
    GetFireCausesDisabledProps<TChildProps, TDataName>
  >(GetFireCausesDisabledDocument, {
    alias: "getFireCausesDisabled",
    ...operationOptions,
  });
}
export type GetFireCausesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetFireCausesDisabledQuery,
  GetFireCausesDisabledQueryVariables
>;
export const RemoveFireCauseDocument = gql`
  mutation removeFireCause($id: String!) {
    removeFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${FireCauseAllFieldsFragmentDoc}
`;
export type RemoveFireCauseMutationFn = ApolloReactCommon.MutationFunction<
  RemoveFireCauseMutation,
  RemoveFireCauseMutationVariables
>;
export type RemoveFireCauseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveFireCauseMutation, RemoveFireCauseMutationVariables>,
  "mutation"
>;

export const RemoveFireCauseComponent = (props: RemoveFireCauseComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveFireCauseMutation, RemoveFireCauseMutationVariables>
    mutation={RemoveFireCauseDocument}
    {...props}
  />
);

export type RemoveFireCauseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveFireCauseMutation, RemoveFireCauseMutationVariables>;
} & TChildProps;
export function withRemoveFireCause<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveFireCauseMutation,
    RemoveFireCauseMutationVariables,
    RemoveFireCauseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveFireCauseMutation,
    RemoveFireCauseMutationVariables,
    RemoveFireCauseProps<TChildProps, TDataName>
  >(RemoveFireCauseDocument, {
    alias: "removeFireCause",
    ...operationOptions,
  });
}
export type RemoveFireCauseMutationResult = ApolloReactCommon.MutationResult<RemoveFireCauseMutation>;
export type RemoveFireCauseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveFireCauseMutation,
  RemoveFireCauseMutationVariables
>;
export const RestoreFireCauseDocument = gql`
  mutation restoreFireCause($id: String!) {
    restoreFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${FireCauseAllFieldsFragmentDoc}
`;
export type RestoreFireCauseMutationFn = ApolloReactCommon.MutationFunction<
  RestoreFireCauseMutation,
  RestoreFireCauseMutationVariables
>;
export type RestoreFireCauseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreFireCauseMutation, RestoreFireCauseMutationVariables>,
  "mutation"
>;

export const RestoreFireCauseComponent = (props: RestoreFireCauseComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreFireCauseMutation, RestoreFireCauseMutationVariables>
    mutation={RestoreFireCauseDocument}
    {...props}
  />
);

export type RestoreFireCauseProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreFireCauseMutation, RestoreFireCauseMutationVariables>;
} & TChildProps;
export function withRestoreFireCause<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreFireCauseMutation,
    RestoreFireCauseMutationVariables,
    RestoreFireCauseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreFireCauseMutation,
    RestoreFireCauseMutationVariables,
    RestoreFireCauseProps<TChildProps, TDataName>
  >(RestoreFireCauseDocument, {
    alias: "restoreFireCause",
    ...operationOptions,
  });
}
export type RestoreFireCauseMutationResult = ApolloReactCommon.MutationResult<RestoreFireCauseMutation>;
export type RestoreFireCauseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreFireCauseMutation,
  RestoreFireCauseMutationVariables
>;
export const GetFireClassesDocument = gql`
  query getFireClasses {
    fireClasses {
      ...fireClassAllFields
    }
  }
  ${FireClassAllFieldsFragmentDoc}
`;
export type GetFireClassesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetFireClassesQuery, GetFireClassesQueryVariables>,
  "query"
>;

export const GetFireClassesComponent = (props: GetFireClassesComponentProps) => (
  <ApolloReactComponents.Query<GetFireClassesQuery, GetFireClassesQueryVariables>
    query={GetFireClassesDocument}
    {...props}
  />
);

export type GetFireClassesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetFireClassesQuery, GetFireClassesQueryVariables>;
} & TChildProps;
export function withGetFireClasses<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetFireClassesQuery,
    GetFireClassesQueryVariables,
    GetFireClassesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetFireClassesQuery,
    GetFireClassesQueryVariables,
    GetFireClassesProps<TChildProps, TDataName>
  >(GetFireClassesDocument, {
    alias: "getFireClasses",
    ...operationOptions,
  });
}
export type GetFireClassesQueryResult = ApolloReactCommon.QueryResult<
  GetFireClassesQuery,
  GetFireClassesQueryVariables
>;
export const GetFireClassesDisabledDocument = gql`
  query getFireClassesDisabled {
    fireClassesDisabled {
      ...fireClassAllFields
    }
  }
  ${FireClassAllFieldsFragmentDoc}
`;
export type GetFireClassesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetFireClassesDisabledQuery, GetFireClassesDisabledQueryVariables>,
  "query"
>;

export const GetFireClassesDisabledComponent = (props: GetFireClassesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetFireClassesDisabledQuery, GetFireClassesDisabledQueryVariables>
    query={GetFireClassesDisabledDocument}
    {...props}
  />
);

export type GetFireClassesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetFireClassesDisabledQuery, GetFireClassesDisabledQueryVariables>;
} & TChildProps;
export function withGetFireClassesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetFireClassesDisabledQuery,
    GetFireClassesDisabledQueryVariables,
    GetFireClassesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetFireClassesDisabledQuery,
    GetFireClassesDisabledQueryVariables,
    GetFireClassesDisabledProps<TChildProps, TDataName>
  >(GetFireClassesDisabledDocument, {
    alias: "getFireClassesDisabled",
    ...operationOptions,
  });
}
export type GetFireClassesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetFireClassesDisabledQuery,
  GetFireClassesDisabledQueryVariables
>;
export const RemoveFireClassDocument = gql`
  mutation removeFireClass($id: String!) {
    removeFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${FireClassAllFieldsFragmentDoc}
`;
export type RemoveFireClassMutationFn = ApolloReactCommon.MutationFunction<
  RemoveFireClassMutation,
  RemoveFireClassMutationVariables
>;
export type RemoveFireClassComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveFireClassMutation, RemoveFireClassMutationVariables>,
  "mutation"
>;

export const RemoveFireClassComponent = (props: RemoveFireClassComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveFireClassMutation, RemoveFireClassMutationVariables>
    mutation={RemoveFireClassDocument}
    {...props}
  />
);

export type RemoveFireClassProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveFireClassMutation, RemoveFireClassMutationVariables>;
} & TChildProps;
export function withRemoveFireClass<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveFireClassMutation,
    RemoveFireClassMutationVariables,
    RemoveFireClassProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveFireClassMutation,
    RemoveFireClassMutationVariables,
    RemoveFireClassProps<TChildProps, TDataName>
  >(RemoveFireClassDocument, {
    alias: "removeFireClass",
    ...operationOptions,
  });
}
export type RemoveFireClassMutationResult = ApolloReactCommon.MutationResult<RemoveFireClassMutation>;
export type RemoveFireClassMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveFireClassMutation,
  RemoveFireClassMutationVariables
>;
export const RestoreFireClassDocument = gql`
  mutation restoreFireClass($id: String!) {
    restoreFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${FireClassAllFieldsFragmentDoc}
`;
export type RestoreFireClassMutationFn = ApolloReactCommon.MutationFunction<
  RestoreFireClassMutation,
  RestoreFireClassMutationVariables
>;
export type RestoreFireClassComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreFireClassMutation, RestoreFireClassMutationVariables>,
  "mutation"
>;

export const RestoreFireClassComponent = (props: RestoreFireClassComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreFireClassMutation, RestoreFireClassMutationVariables>
    mutation={RestoreFireClassDocument}
    {...props}
  />
);

export type RestoreFireClassProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreFireClassMutation, RestoreFireClassMutationVariables>;
} & TChildProps;
export function withRestoreFireClass<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreFireClassMutation,
    RestoreFireClassMutationVariables,
    RestoreFireClassProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreFireClassMutation,
    RestoreFireClassMutationVariables,
    RestoreFireClassProps<TChildProps, TDataName>
  >(RestoreFireClassDocument, {
    alias: "restoreFireClass",
    ...operationOptions,
  });
}
export type RestoreFireClassMutationResult = ApolloReactCommon.MutationResult<RestoreFireClassMutation>;
export type RestoreFireClassMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreFireClassMutation,
  RestoreFireClassMutationVariables
>;
export const GetRanksDocument = gql`
  query getRanks {
    ranks {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export type GetRanksComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetRanksQuery, GetRanksQueryVariables>,
  "query"
>;

export const GetRanksComponent = (props: GetRanksComponentProps) => (
  <ApolloReactComponents.Query<GetRanksQuery, GetRanksQueryVariables> query={GetRanksDocument} {...props} />
);

export type GetRanksProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetRanksQuery, GetRanksQueryVariables>;
} & TChildProps;
export function withGetRanks<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetRanksQuery,
    GetRanksQueryVariables,
    GetRanksProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetRanksQuery, GetRanksQueryVariables, GetRanksProps<TChildProps, TDataName>>(
    GetRanksDocument,
    {
      alias: "getRanks",
      ...operationOptions,
    }
  );
}
export type GetRanksQueryResult = ApolloReactCommon.QueryResult<GetRanksQuery, GetRanksQueryVariables>;
export const GetRanksDisabledDocument = gql`
  query getRanksDisabled {
    ranksDisabled {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export type GetRanksDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetRanksDisabledQuery, GetRanksDisabledQueryVariables>,
  "query"
>;

export const GetRanksDisabledComponent = (props: GetRanksDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetRanksDisabledQuery, GetRanksDisabledQueryVariables>
    query={GetRanksDisabledDocument}
    {...props}
  />
);

export type GetRanksDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetRanksDisabledQuery, GetRanksDisabledQueryVariables>;
} & TChildProps;
export function withGetRanksDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetRanksDisabledQuery,
    GetRanksDisabledQueryVariables,
    GetRanksDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetRanksDisabledQuery,
    GetRanksDisabledQueryVariables,
    GetRanksDisabledProps<TChildProps, TDataName>
  >(GetRanksDisabledDocument, {
    alias: "getRanksDisabled",
    ...operationOptions,
  });
}
export type GetRanksDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetRanksDisabledQuery,
  GetRanksDisabledQueryVariables
>;
export const FindRankDocument = gql`
  query findRank($id: String!) {
    rank(id: $id) {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export type FindRankComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindRankQuery, FindRankQueryVariables>,
  "query"
> &
  ({ variables: FindRankQueryVariables; skip?: boolean } | { skip: boolean });

export const FindRankComponent = (props: FindRankComponentProps) => (
  <ApolloReactComponents.Query<FindRankQuery, FindRankQueryVariables> query={FindRankDocument} {...props} />
);

export type FindRankProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindRankQuery, FindRankQueryVariables>;
} & TChildProps;
export function withFindRank<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindRankQuery,
    FindRankQueryVariables,
    FindRankProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, FindRankQuery, FindRankQueryVariables, FindRankProps<TChildProps, TDataName>>(
    FindRankDocument,
    {
      alias: "findRank",
      ...operationOptions,
    }
  );
}
export type FindRankQueryResult = ApolloReactCommon.QueryResult<FindRankQuery, FindRankQueryVariables>;
export const EditRankDocument = gql`
  mutation editRank($input: UpdateRankInput!) {
    updateRank(updateRankInput: $input) {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export type EditRankMutationFn = ApolloReactCommon.MutationFunction<EditRankMutation, EditRankMutationVariables>;
export type EditRankComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditRankMutation, EditRankMutationVariables>,
  "mutation"
>;

export const EditRankComponent = (props: EditRankComponentProps) => (
  <ApolloReactComponents.Mutation<EditRankMutation, EditRankMutationVariables> mutation={EditRankDocument} {...props} />
);

export type EditRankProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditRankMutation, EditRankMutationVariables>;
} & TChildProps;
export function withEditRank<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditRankMutation,
    EditRankMutationVariables,
    EditRankProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditRankMutation,
    EditRankMutationVariables,
    EditRankProps<TChildProps, TDataName>
  >(EditRankDocument, {
    alias: "editRank",
    ...operationOptions,
  });
}
export type EditRankMutationResult = ApolloReactCommon.MutationResult<EditRankMutation>;
export type EditRankMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditRankMutation,
  EditRankMutationVariables
>;
export const CreateRankDocument = gql`
  mutation createRank($input: CreateRankInput!) {
    createRank(createRankInput: $input) {
      ...rankAllFields
    }
  }
  ${RankAllFieldsFragmentDoc}
`;
export type CreateRankMutationFn = ApolloReactCommon.MutationFunction<CreateRankMutation, CreateRankMutationVariables>;
export type CreateRankComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateRankMutation, CreateRankMutationVariables>,
  "mutation"
>;

export const CreateRankComponent = (props: CreateRankComponentProps) => (
  <ApolloReactComponents.Mutation<CreateRankMutation, CreateRankMutationVariables>
    mutation={CreateRankDocument}
    {...props}
  />
);

export type CreateRankProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateRankMutation, CreateRankMutationVariables>;
} & TChildProps;
export function withCreateRank<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateRankMutation,
    CreateRankMutationVariables,
    CreateRankProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateRankMutation,
    CreateRankMutationVariables,
    CreateRankProps<TChildProps, TDataName>
  >(CreateRankDocument, {
    alias: "createRank",
    ...operationOptions,
  });
}
export type CreateRankMutationResult = ApolloReactCommon.MutationResult<CreateRankMutation>;
export type CreateRankMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRankMutation,
  CreateRankMutationVariables
>;
export const DeleteRankDocument = gql`
  mutation deleteRank($id: String!) {
    removeRank(id: $id) {
      id
    }
  }
`;
export type DeleteRankMutationFn = ApolloReactCommon.MutationFunction<DeleteRankMutation, DeleteRankMutationVariables>;
export type DeleteRankComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteRankMutation, DeleteRankMutationVariables>,
  "mutation"
>;

export const DeleteRankComponent = (props: DeleteRankComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteRankMutation, DeleteRankMutationVariables>
    mutation={DeleteRankDocument}
    {...props}
  />
);

export type DeleteRankProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteRankMutation, DeleteRankMutationVariables>;
} & TChildProps;
export function withDeleteRank<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteRankMutation,
    DeleteRankMutationVariables,
    DeleteRankProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteRankMutation,
    DeleteRankMutationVariables,
    DeleteRankProps<TChildProps, TDataName>
  >(DeleteRankDocument, {
    alias: "deleteRank",
    ...operationOptions,
  });
}
export type DeleteRankMutationResult = ApolloReactCommon.MutationResult<DeleteRankMutation>;
export type DeleteRankMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRankMutation,
  DeleteRankMutationVariables
>;
export const RestoreRankDocument = gql`
  mutation restoreRank($id: String!) {
    restoreRank(id: $id) {
      id
    }
  }
`;
export type RestoreRankMutationFn = ApolloReactCommon.MutationFunction<
  RestoreRankMutation,
  RestoreRankMutationVariables
>;
export type RestoreRankComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreRankMutation, RestoreRankMutationVariables>,
  "mutation"
>;

export const RestoreRankComponent = (props: RestoreRankComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreRankMutation, RestoreRankMutationVariables>
    mutation={RestoreRankDocument}
    {...props}
  />
);

export type RestoreRankProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreRankMutation, RestoreRankMutationVariables>;
} & TChildProps;
export function withRestoreRank<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreRankMutation,
    RestoreRankMutationVariables,
    RestoreRankProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreRankMutation,
    RestoreRankMutationVariables,
    RestoreRankProps<TChildProps, TDataName>
  >(RestoreRankDocument, {
    alias: "restoreRank",
    ...operationOptions,
  });
}
export type RestoreRankMutationResult = ApolloReactCommon.MutationResult<RestoreRankMutation>;
export type RestoreRankMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreRankMutation,
  RestoreRankMutationVariables
>;
export const GetServicesDocument = gql`
  query getServices {
    services {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type GetServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetServicesQuery, GetServicesQueryVariables>,
  "query"
>;

export const GetServicesComponent = (props: GetServicesComponentProps) => (
  <ApolloReactComponents.Query<GetServicesQuery, GetServicesQueryVariables> query={GetServicesDocument} {...props} />
);

export type GetServicesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetServicesQuery, GetServicesQueryVariables>;
} & TChildProps;
export function withGetServices<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetServicesQuery,
    GetServicesQueryVariables,
    GetServicesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetServicesQuery,
    GetServicesQueryVariables,
    GetServicesProps<TChildProps, TDataName>
  >(GetServicesDocument, {
    alias: "getServices",
    ...operationOptions,
  });
}
export type GetServicesQueryResult = ApolloReactCommon.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetServicesDisabledDocument = gql`
  query getServicesDisabled {
    servicesDisabled {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type GetServicesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetServicesDisabledQuery, GetServicesDisabledQueryVariables>,
  "query"
>;

export const GetServicesDisabledComponent = (props: GetServicesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetServicesDisabledQuery, GetServicesDisabledQueryVariables>
    query={GetServicesDisabledDocument}
    {...props}
  />
);

export type GetServicesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetServicesDisabledQuery, GetServicesDisabledQueryVariables>;
} & TChildProps;
export function withGetServicesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetServicesDisabledQuery,
    GetServicesDisabledQueryVariables,
    GetServicesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetServicesDisabledQuery,
    GetServicesDisabledQueryVariables,
    GetServicesDisabledProps<TChildProps, TDataName>
  >(GetServicesDisabledDocument, {
    alias: "getServicesDisabled",
    ...operationOptions,
  });
}
export type GetServicesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetServicesDisabledQuery,
  GetServicesDisabledQueryVariables
>;
export const FindServiceDocument = gql`
  query findService($id: String!) {
    service(id: $id) {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type FindServiceComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindServiceQuery, FindServiceQueryVariables>,
  "query"
> &
  ({ variables: FindServiceQueryVariables; skip?: boolean } | { skip: boolean });

export const FindServiceComponent = (props: FindServiceComponentProps) => (
  <ApolloReactComponents.Query<FindServiceQuery, FindServiceQueryVariables> query={FindServiceDocument} {...props} />
);

export type FindServiceProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindServiceQuery, FindServiceQueryVariables>;
} & TChildProps;
export function withFindService<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindServiceQuery,
    FindServiceQueryVariables,
    FindServiceProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindServiceQuery,
    FindServiceQueryVariables,
    FindServiceProps<TChildProps, TDataName>
  >(FindServiceDocument, {
    alias: "findService",
    ...operationOptions,
  });
}
export type FindServiceQueryResult = ApolloReactCommon.QueryResult<FindServiceQuery, FindServiceQueryVariables>;
export const EditServiceDocument = gql`
  mutation editService($input: UpdateServiceInput!) {
    updateService(updateServiceInput: $input) {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type EditServiceMutationFn = ApolloReactCommon.MutationFunction<
  EditServiceMutation,
  EditServiceMutationVariables
>;
export type EditServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditServiceMutation, EditServiceMutationVariables>,
  "mutation"
>;

export const EditServiceComponent = (props: EditServiceComponentProps) => (
  <ApolloReactComponents.Mutation<EditServiceMutation, EditServiceMutationVariables>
    mutation={EditServiceDocument}
    {...props}
  />
);

export type EditServiceProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditServiceMutation, EditServiceMutationVariables>;
} & TChildProps;
export function withEditService<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditServiceMutation,
    EditServiceMutationVariables,
    EditServiceProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditServiceMutation,
    EditServiceMutationVariables,
    EditServiceProps<TChildProps, TDataName>
  >(EditServiceDocument, {
    alias: "editService",
    ...operationOptions,
  });
}
export type EditServiceMutationResult = ApolloReactCommon.MutationResult<EditServiceMutation>;
export type EditServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditServiceMutation,
  EditServiceMutationVariables
>;
export const CreateServiceDocument = gql`
  mutation createService($input: CreateServiceInput!) {
    createService(createServiceInput: $input) {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type CreateServiceMutationFn = ApolloReactCommon.MutationFunction<
  CreateServiceMutation,
  CreateServiceMutationVariables
>;
export type CreateServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateServiceMutation, CreateServiceMutationVariables>,
  "mutation"
>;

export const CreateServiceComponent = (props: CreateServiceComponentProps) => (
  <ApolloReactComponents.Mutation<CreateServiceMutation, CreateServiceMutationVariables>
    mutation={CreateServiceDocument}
    {...props}
  />
);

export type CreateServiceProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;
} & TChildProps;
export function withCreateService<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateServiceMutation,
    CreateServiceMutationVariables,
    CreateServiceProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateServiceMutation,
    CreateServiceMutationVariables,
    CreateServiceProps<TChildProps, TDataName>
  >(CreateServiceDocument, {
    alias: "createService",
    ...operationOptions,
  });
}
export type CreateServiceMutationResult = ApolloReactCommon.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateServiceMutation,
  CreateServiceMutationVariables
>;
export const RemoveServiceDocument = gql`
  mutation removeService($id: String!) {
    removeService(id: $id) {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type RemoveServiceMutationFn = ApolloReactCommon.MutationFunction<
  RemoveServiceMutation,
  RemoveServiceMutationVariables
>;
export type RemoveServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RemoveServiceMutation, RemoveServiceMutationVariables>,
  "mutation"
>;

export const RemoveServiceComponent = (props: RemoveServiceComponentProps) => (
  <ApolloReactComponents.Mutation<RemoveServiceMutation, RemoveServiceMutationVariables>
    mutation={RemoveServiceDocument}
    {...props}
  />
);

export type RemoveServiceProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveServiceMutation, RemoveServiceMutationVariables>;
} & TChildProps;
export function withRemoveService<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveServiceMutation,
    RemoveServiceMutationVariables,
    RemoveServiceProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveServiceMutation,
    RemoveServiceMutationVariables,
    RemoveServiceProps<TChildProps, TDataName>
  >(RemoveServiceDocument, {
    alias: "removeService",
    ...operationOptions,
  });
}
export type RemoveServiceMutationResult = ApolloReactCommon.MutationResult<RemoveServiceMutation>;
export type RemoveServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveServiceMutation,
  RemoveServiceMutationVariables
>;
export const RestoreServiceDocument = gql`
  mutation restoreService($id: String!) {
    restoreService(id: $id) {
      ...servicesAllFields
    }
  }
  ${ServicesAllFieldsFragmentDoc}
`;
export type RestoreServiceMutationFn = ApolloReactCommon.MutationFunction<
  RestoreServiceMutation,
  RestoreServiceMutationVariables
>;
export type RestoreServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreServiceMutation, RestoreServiceMutationVariables>,
  "mutation"
>;

export const RestoreServiceComponent = (props: RestoreServiceComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreServiceMutation, RestoreServiceMutationVariables>
    mutation={RestoreServiceDocument}
    {...props}
  />
);

export type RestoreServiceProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreServiceMutation, RestoreServiceMutationVariables>;
} & TChildProps;
export function withRestoreService<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreServiceMutation,
    RestoreServiceMutationVariables,
    RestoreServiceProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreServiceMutation,
    RestoreServiceMutationVariables,
    RestoreServiceProps<TChildProps, TDataName>
  >(RestoreServiceDocument, {
    alias: "restoreService",
    ...operationOptions,
  });
}
export type RestoreServiceMutationResult = ApolloReactCommon.MutationResult<RestoreServiceMutation>;
export type RestoreServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreServiceMutation,
  RestoreServiceMutationVariables
>;
export const GetSubTypesDocument = gql`
  query getSubTypes {
    subTypes {
      ...subTypeAllFields
    }
  }
  ${SubTypeAllFieldsFragmentDoc}
`;
export type GetSubTypesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetSubTypesQuery, GetSubTypesQueryVariables>,
  "query"
>;

export const GetSubTypesComponent = (props: GetSubTypesComponentProps) => (
  <ApolloReactComponents.Query<GetSubTypesQuery, GetSubTypesQueryVariables> query={GetSubTypesDocument} {...props} />
);

export type GetSubTypesProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetSubTypesQuery, GetSubTypesQueryVariables>;
} & TChildProps;
export function withGetSubTypes<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetSubTypesQuery,
    GetSubTypesQueryVariables,
    GetSubTypesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetSubTypesQuery,
    GetSubTypesQueryVariables,
    GetSubTypesProps<TChildProps, TDataName>
  >(GetSubTypesDocument, {
    alias: "getSubTypes",
    ...operationOptions,
  });
}
export type GetSubTypesQueryResult = ApolloReactCommon.QueryResult<GetSubTypesQuery, GetSubTypesQueryVariables>;
export const GetSubTypesDisabledDocument = gql`
  query getSubTypesDisabled {
    subTypesDisabled {
      ...subTypeAllFields
    }
  }
  ${SubTypeAllFieldsFragmentDoc}
`;
export type GetSubTypesDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetSubTypesDisabledQuery, GetSubTypesDisabledQueryVariables>,
  "query"
>;

export const GetSubTypesDisabledComponent = (props: GetSubTypesDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetSubTypesDisabledQuery, GetSubTypesDisabledQueryVariables>
    query={GetSubTypesDisabledDocument}
    {...props}
  />
);

export type GetSubTypesDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetSubTypesDisabledQuery, GetSubTypesDisabledQueryVariables>;
} & TChildProps;
export function withGetSubTypesDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetSubTypesDisabledQuery,
    GetSubTypesDisabledQueryVariables,
    GetSubTypesDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetSubTypesDisabledQuery,
    GetSubTypesDisabledQueryVariables,
    GetSubTypesDisabledProps<TChildProps, TDataName>
  >(GetSubTypesDisabledDocument, {
    alias: "getSubTypesDisabled",
    ...operationOptions,
  });
}
export type GetSubTypesDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetSubTypesDisabledQuery,
  GetSubTypesDisabledQueryVariables
>;
export const GetVolunteersDocument = gql`
  query getVolunteers {
    volunteers {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export type GetVolunteersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetVolunteersQuery, GetVolunteersQueryVariables>,
  "query"
>;

export const GetVolunteersComponent = (props: GetVolunteersComponentProps) => (
  <ApolloReactComponents.Query<GetVolunteersQuery, GetVolunteersQueryVariables>
    query={GetVolunteersDocument}
    {...props}
  />
);

export type GetVolunteersProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetVolunteersQuery, GetVolunteersQueryVariables>;
} & TChildProps;
export function withGetVolunteers<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetVolunteersQuery,
    GetVolunteersQueryVariables,
    GetVolunteersProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetVolunteersQuery,
    GetVolunteersQueryVariables,
    GetVolunteersProps<TChildProps, TDataName>
  >(GetVolunteersDocument, {
    alias: "getVolunteers",
    ...operationOptions,
  });
}
export type GetVolunteersQueryResult = ApolloReactCommon.QueryResult<GetVolunteersQuery, GetVolunteersQueryVariables>;
export const GetVolunteersDisabledDocument = gql`
  query getVolunteersDisabled {
    volunteersDisabled {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export type GetVolunteersDisabledComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetVolunteersDisabledQuery, GetVolunteersDisabledQueryVariables>,
  "query"
>;

export const GetVolunteersDisabledComponent = (props: GetVolunteersDisabledComponentProps) => (
  <ApolloReactComponents.Query<GetVolunteersDisabledQuery, GetVolunteersDisabledQueryVariables>
    query={GetVolunteersDisabledDocument}
    {...props}
  />
);

export type GetVolunteersDisabledProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetVolunteersDisabledQuery, GetVolunteersDisabledQueryVariables>;
} & TChildProps;
export function withGetVolunteersDisabled<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetVolunteersDisabledQuery,
    GetVolunteersDisabledQueryVariables,
    GetVolunteersDisabledProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetVolunteersDisabledQuery,
    GetVolunteersDisabledQueryVariables,
    GetVolunteersDisabledProps<TChildProps, TDataName>
  >(GetVolunteersDisabledDocument, {
    alias: "getVolunteersDisabled",
    ...operationOptions,
  });
}
export type GetVolunteersDisabledQueryResult = ApolloReactCommon.QueryResult<
  GetVolunteersDisabledQuery,
  GetVolunteersDisabledQueryVariables
>;
export const FindVolunteerDocument = gql`
  query findVolunteer($id: String!) {
    volunteer(id: $id) {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export type FindVolunteerComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FindVolunteerQuery, FindVolunteerQueryVariables>,
  "query"
> &
  ({ variables: FindVolunteerQueryVariables; skip?: boolean } | { skip: boolean });

export const FindVolunteerComponent = (props: FindVolunteerComponentProps) => (
  <ApolloReactComponents.Query<FindVolunteerQuery, FindVolunteerQueryVariables>
    query={FindVolunteerDocument}
    {...props}
  />
);

export type FindVolunteerProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<FindVolunteerQuery, FindVolunteerQueryVariables>;
} & TChildProps;
export function withFindVolunteer<TProps, TChildProps = {}, TDataName extends string = "data">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindVolunteerQuery,
    FindVolunteerQueryVariables,
    FindVolunteerProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindVolunteerQuery,
    FindVolunteerQueryVariables,
    FindVolunteerProps<TChildProps, TDataName>
  >(FindVolunteerDocument, {
    alias: "findVolunteer",
    ...operationOptions,
  });
}
export type FindVolunteerQueryResult = ApolloReactCommon.QueryResult<FindVolunteerQuery, FindVolunteerQueryVariables>;
export const EditVolunteerDocument = gql`
  mutation editVolunteer($input: UpdateVolunteerInput!) {
    updateVolunteer(updateVolunteerInput: $input) {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export type EditVolunteerMutationFn = ApolloReactCommon.MutationFunction<
  EditVolunteerMutation,
  EditVolunteerMutationVariables
>;
export type EditVolunteerComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<EditVolunteerMutation, EditVolunteerMutationVariables>,
  "mutation"
>;

export const EditVolunteerComponent = (props: EditVolunteerComponentProps) => (
  <ApolloReactComponents.Mutation<EditVolunteerMutation, EditVolunteerMutationVariables>
    mutation={EditVolunteerDocument}
    {...props}
  />
);

export type EditVolunteerProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<EditVolunteerMutation, EditVolunteerMutationVariables>;
} & TChildProps;
export function withEditVolunteer<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditVolunteerMutation,
    EditVolunteerMutationVariables,
    EditVolunteerProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditVolunteerMutation,
    EditVolunteerMutationVariables,
    EditVolunteerProps<TChildProps, TDataName>
  >(EditVolunteerDocument, {
    alias: "editVolunteer",
    ...operationOptions,
  });
}
export type EditVolunteerMutationResult = ApolloReactCommon.MutationResult<EditVolunteerMutation>;
export type EditVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditVolunteerMutation,
  EditVolunteerMutationVariables
>;
export const CreateVolunteerDocument = gql`
  mutation createVolunteer($input: CreateVolunteerInput!) {
    createVolunteer(createVolunteerInput: $input) {
      ...volunteerAllFields
    }
  }
  ${VolunteerAllFieldsFragmentDoc}
`;
export type CreateVolunteerMutationFn = ApolloReactCommon.MutationFunction<
  CreateVolunteerMutation,
  CreateVolunteerMutationVariables
>;
export type CreateVolunteerComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>,
  "mutation"
>;

export const CreateVolunteerComponent = (props: CreateVolunteerComponentProps) => (
  <ApolloReactComponents.Mutation<CreateVolunteerMutation, CreateVolunteerMutationVariables>
    mutation={CreateVolunteerDocument}
    {...props}
  />
);

export type CreateVolunteerProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateVolunteerMutation, CreateVolunteerMutationVariables>;
} & TChildProps;
export function withCreateVolunteer<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateVolunteerMutation,
    CreateVolunteerMutationVariables,
    CreateVolunteerProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateVolunteerMutation,
    CreateVolunteerMutationVariables,
    CreateVolunteerProps<TChildProps, TDataName>
  >(CreateVolunteerDocument, {
    alias: "createVolunteer",
    ...operationOptions,
  });
}
export type CreateVolunteerMutationResult = ApolloReactCommon.MutationResult<CreateVolunteerMutation>;
export type CreateVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateVolunteerMutation,
  CreateVolunteerMutationVariables
>;
export const DeleteVolunteerDocument = gql`
  mutation deleteVolunteer($id: String!) {
    removeVolunteer(id: $id) {
      id
    }
  }
`;
export type DeleteVolunteerMutationFn = ApolloReactCommon.MutationFunction<
  DeleteVolunteerMutation,
  DeleteVolunteerMutationVariables
>;
export type DeleteVolunteerComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>,
  "mutation"
>;

export const DeleteVolunteerComponent = (props: DeleteVolunteerComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>
    mutation={DeleteVolunteerDocument}
    {...props}
  />
);

export type DeleteVolunteerProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>;
} & TChildProps;
export function withDeleteVolunteer<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteVolunteerMutation,
    DeleteVolunteerMutationVariables,
    DeleteVolunteerProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteVolunteerMutation,
    DeleteVolunteerMutationVariables,
    DeleteVolunteerProps<TChildProps, TDataName>
  >(DeleteVolunteerDocument, {
    alias: "deleteVolunteer",
    ...operationOptions,
  });
}
export type DeleteVolunteerMutationResult = ApolloReactCommon.MutationResult<DeleteVolunteerMutation>;
export type DeleteVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteVolunteerMutation,
  DeleteVolunteerMutationVariables
>;
export const RestoreVolunteerDocument = gql`
  mutation restoreVolunteer($id: String!) {
    restoreVolunteer(id: $id) {
      id
    }
  }
`;
export type RestoreVolunteerMutationFn = ApolloReactCommon.MutationFunction<
  RestoreVolunteerMutation,
  RestoreVolunteerMutationVariables
>;
export type RestoreVolunteerComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RestoreVolunteerMutation, RestoreVolunteerMutationVariables>,
  "mutation"
>;

export const RestoreVolunteerComponent = (props: RestoreVolunteerComponentProps) => (
  <ApolloReactComponents.Mutation<RestoreVolunteerMutation, RestoreVolunteerMutationVariables>
    mutation={RestoreVolunteerDocument}
    {...props}
  />
);

export type RestoreVolunteerProps<TChildProps = {}, TDataName extends string = "mutate"> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<RestoreVolunteerMutation, RestoreVolunteerMutationVariables>;
} & TChildProps;
export function withRestoreVolunteer<TProps, TChildProps = {}, TDataName extends string = "mutate">(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RestoreVolunteerMutation,
    RestoreVolunteerMutationVariables,
    RestoreVolunteerProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RestoreVolunteerMutation,
    RestoreVolunteerMutationVariables,
    RestoreVolunteerProps<TChildProps, TDataName>
  >(RestoreVolunteerDocument, {
    alias: "restoreVolunteer",
    ...operationOptions,
  });
}
export type RestoreVolunteerMutationResult = ApolloReactCommon.MutationResult<RestoreVolunteerMutation>;
export type RestoreVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RestoreVolunteerMutation,
  RestoreVolunteerMutationVariables
>;
