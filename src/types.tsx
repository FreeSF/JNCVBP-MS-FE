import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
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
};

export type CreateDutyInput = {
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  name: Scalars['String'];
};

export type CreateVolunteerInput = {
  name: Scalars['String'];
};

export type Duty = {
  __typename?: 'Duty';
  id: Scalars['ID'];
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createVolunteer: Volunteer;
  updateVolunteer: Volunteer;
  removeVolunteer: Volunteer;
  createUser: User;
  updateUser: User;
  removeUser: User;
  createDuty: Duty;
  updateDuty: Duty;
  removeDuty: Duty;
};


export type MutationCreateVolunteerArgs = {
  createVolunteerInput: CreateVolunteerInput;
};


export type MutationUpdateVolunteerArgs = {
  updateVolunteerInput: UpdateVolunteerInput;
};


export type MutationRemoveVolunteerArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateDutyArgs = {
  createDutyInput: CreateDutyInput;
};


export type MutationUpdateDutyArgs = {
  updateDutyInput: UpdateDutyInput;
};


export type MutationRemoveDutyArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  volunteers: Array<Volunteer>;
  volunteer: Volunteer;
  users: Array<User>;
  user: User;
  duties: Array<Duty>;
  duty: Duty;
};


export type QueryVolunteerArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryDutyArgs = {
  id: Scalars['String'];
};

export type UpdateDutyInput = {
  name?: Maybe<Scalars['String']>;
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type UpdateVolunteerInput = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Volunteer = {
  __typename?: 'Volunteer';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type VolunteerfieldsFragment = (
  { __typename: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'name'>
);

export type GetVolunteeersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVolunteeersQuery = (
  { __typename?: 'Query' }
  & { volunteers: Array<(
    { __typename?: 'Volunteer' }
    & VolunteerfieldsFragment
  )> }
);

export type VolunteerAllFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'name'>
);

export type GetVolunteersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVolunteersQuery = (
  { __typename?: 'Query' }
  & { volunteers: Array<(
    { __typename?: 'Volunteer' }
    & VolunteerAllFieldsFragment
  )> }
);

export type FindVolunteerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindVolunteerQuery = (
  { __typename?: 'Query' }
  & { volunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerAllFieldsFragment
  ) }
);

export type EditVolunteerMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
}>;


export type EditVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerAllFieldsFragment
  ) }
);

export type CreateVolunteerMutationVariables = Exact<{
  input: CreateVolunteerInput;
}>;


export type CreateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerAllFieldsFragment
  ) }
);

export type DeleteVolunteerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { removeVolunteer: (
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, 'id'>
  ) }
);

export const VolunteerfieldsFragmentDoc = gql`
    fragment volunteerfields on Volunteer {
  id
  name
  __typename
}
    `;
export const VolunteerAllFieldsFragmentDoc = gql`
    fragment volunteerAllFields on Volunteer {
  id
  name
}
    `;
export const GetVolunteeersDocument = gql`
    query getVolunteeers {
  volunteers {
    ...volunteerfields
  }
}
    ${VolunteerfieldsFragmentDoc}`;
export type GetVolunteeersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetVolunteeersQuery, GetVolunteeersQueryVariables>, 'query'>;

    export const GetVolunteeersComponent = (props: GetVolunteeersComponentProps) => (
      <ApolloReactComponents.Query<GetVolunteeersQuery, GetVolunteeersQueryVariables> query={GetVolunteeersDocument} {...props} />
    );
    
export type GetVolunteeersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetVolunteeersQuery, GetVolunteeersQueryVariables>
    } & TChildProps;
export function withGetVolunteeers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetVolunteeersQuery,
  GetVolunteeersQueryVariables,
  GetVolunteeersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetVolunteeersQuery, GetVolunteeersQueryVariables, GetVolunteeersProps<TChildProps, TDataName>>(GetVolunteeersDocument, {
      alias: 'getVolunteeers',
      ...operationOptions
    });
};
export type GetVolunteeersQueryResult = ApolloReactCommon.QueryResult<GetVolunteeersQuery, GetVolunteeersQueryVariables>;
export const GetVolunteersDocument = gql`
    query getVolunteers {
  volunteers {
    ...volunteerAllFields
  }
}
    ${VolunteerAllFieldsFragmentDoc}`;
export type GetVolunteersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetVolunteersQuery, GetVolunteersQueryVariables>, 'query'>;

    export const GetVolunteersComponent = (props: GetVolunteersComponentProps) => (
      <ApolloReactComponents.Query<GetVolunteersQuery, GetVolunteersQueryVariables> query={GetVolunteersDocument} {...props} />
    );
    
export type GetVolunteersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetVolunteersQuery, GetVolunteersQueryVariables>
    } & TChildProps;
export function withGetVolunteers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetVolunteersQuery,
  GetVolunteersQueryVariables,
  GetVolunteersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetVolunteersQuery, GetVolunteersQueryVariables, GetVolunteersProps<TChildProps, TDataName>>(GetVolunteersDocument, {
      alias: 'getVolunteers',
      ...operationOptions
    });
};
export type GetVolunteersQueryResult = ApolloReactCommon.QueryResult<GetVolunteersQuery, GetVolunteersQueryVariables>;
export const FindVolunteerDocument = gql`
    query findVolunteer($id: String!) {
  volunteer(id: $id) {
    ...volunteerAllFields
  }
}
    ${VolunteerAllFieldsFragmentDoc}`;
export type FindVolunteerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindVolunteerQuery, FindVolunteerQueryVariables>, 'query'> & ({ variables: FindVolunteerQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FindVolunteerComponent = (props: FindVolunteerComponentProps) => (
      <ApolloReactComponents.Query<FindVolunteerQuery, FindVolunteerQueryVariables> query={FindVolunteerDocument} {...props} />
    );
    
export type FindVolunteerProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindVolunteerQuery, FindVolunteerQueryVariables>
    } & TChildProps;
export function withFindVolunteer<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindVolunteerQuery,
  FindVolunteerQueryVariables,
  FindVolunteerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindVolunteerQuery, FindVolunteerQueryVariables, FindVolunteerProps<TChildProps, TDataName>>(FindVolunteerDocument, {
      alias: 'findVolunteer',
      ...operationOptions
    });
};
export type FindVolunteerQueryResult = ApolloReactCommon.QueryResult<FindVolunteerQuery, FindVolunteerQueryVariables>;
export const EditVolunteerDocument = gql`
    mutation editVolunteer($id: String!, $name: String) {
  updateVolunteer(updateVolunteerInput: {id: $id, name: $name}) {
    ...volunteerAllFields
  }
}
    ${VolunteerAllFieldsFragmentDoc}`;
export type EditVolunteerMutationFn = ApolloReactCommon.MutationFunction<EditVolunteerMutation, EditVolunteerMutationVariables>;
export type EditVolunteerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditVolunteerMutation, EditVolunteerMutationVariables>, 'mutation'>;

    export const EditVolunteerComponent = (props: EditVolunteerComponentProps) => (
      <ApolloReactComponents.Mutation<EditVolunteerMutation, EditVolunteerMutationVariables> mutation={EditVolunteerDocument} {...props} />
    );
    
export type EditVolunteerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditVolunteerMutation, EditVolunteerMutationVariables>
    } & TChildProps;
export function withEditVolunteer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditVolunteerMutation,
  EditVolunteerMutationVariables,
  EditVolunteerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditVolunteerMutation, EditVolunteerMutationVariables, EditVolunteerProps<TChildProps, TDataName>>(EditVolunteerDocument, {
      alias: 'editVolunteer',
      ...operationOptions
    });
};
export type EditVolunteerMutationResult = ApolloReactCommon.MutationResult<EditVolunteerMutation>;
export type EditVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<EditVolunteerMutation, EditVolunteerMutationVariables>;
export const CreateVolunteerDocument = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
  createVolunteer(createVolunteerInput: $input) {
    ...volunteerAllFields
  }
}
    ${VolunteerAllFieldsFragmentDoc}`;
export type CreateVolunteerMutationFn = ApolloReactCommon.MutationFunction<CreateVolunteerMutation, CreateVolunteerMutationVariables>;
export type CreateVolunteerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>, 'mutation'>;

    export const CreateVolunteerComponent = (props: CreateVolunteerComponentProps) => (
      <ApolloReactComponents.Mutation<CreateVolunteerMutation, CreateVolunteerMutationVariables> mutation={CreateVolunteerDocument} {...props} />
    );
    
export type CreateVolunteerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateVolunteerMutation, CreateVolunteerMutationVariables>
    } & TChildProps;
export function withCreateVolunteer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateVolunteerMutation,
  CreateVolunteerMutationVariables,
  CreateVolunteerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateVolunteerMutation, CreateVolunteerMutationVariables, CreateVolunteerProps<TChildProps, TDataName>>(CreateVolunteerDocument, {
      alias: 'createVolunteer',
      ...operationOptions
    });
};
export type CreateVolunteerMutationResult = ApolloReactCommon.MutationResult<CreateVolunteerMutation>;
export type CreateVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>;
export const DeleteVolunteerDocument = gql`
    mutation deleteVolunteer($id: String!) {
  removeVolunteer(id: $id) {
    id
  }
}
    `;
export type DeleteVolunteerMutationFn = ApolloReactCommon.MutationFunction<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>;
export type DeleteVolunteerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>, 'mutation'>;

    export const DeleteVolunteerComponent = (props: DeleteVolunteerComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteVolunteerMutation, DeleteVolunteerMutationVariables> mutation={DeleteVolunteerDocument} {...props} />
    );
    
export type DeleteVolunteerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>
    } & TChildProps;
export function withDeleteVolunteer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteVolunteerMutation,
  DeleteVolunteerMutationVariables,
  DeleteVolunteerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteVolunteerMutation, DeleteVolunteerMutationVariables, DeleteVolunteerProps<TChildProps, TDataName>>(DeleteVolunteerDocument, {
      alias: 'deleteVolunteer',
      ...operationOptions
    });
};
export type DeleteVolunteerMutationResult = ApolloReactCommon.MutationResult<DeleteVolunteerMutation>;
export type DeleteVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>;