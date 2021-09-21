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

export type CreateRankInput = {
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateVolunteerInput = {
  name: Scalars['String'];
};

export type Duty = {
  __typename?: 'Duty';
  _id: Scalars['ID'];
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDuty: Duty;
  deleteDuty: Scalars['Boolean'];
  editDuty: Duty;
  createRank: Rank;
  deleteRank: Scalars['Boolean'];
  editRank: Rank;
  createVolunteer: Volunteer;
  deleteVolunteer: Scalars['Boolean'];
  editVolunteer: Volunteer;
};


export type MutationCreateDutyArgs = {
  createDutyInput: CreateDutyInput;
};


export type MutationDeleteDutyArgs = {
  _id: Scalars['String'];
};


export type MutationEditDutyArgs = {
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationCreateRankArgs = {
  createRankInput: CreateRankInput;
};


export type MutationDeleteRankArgs = {
  _id: Scalars['String'];
};


export type MutationEditRankArgs = {
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationCreateVolunteerArgs = {
  createVolunteerInput: CreateVolunteerInput;
};


export type MutationDeleteVolunteerArgs = {
  _id: Scalars['String'];
};


export type MutationEditVolunteerArgs = {
  name?: Maybe<Scalars['String']>;
  _id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  duty: Duty;
  duties: Array<Duty>;
  rank: Rank;
  ranks: Array<Rank>;
  volunteer: Volunteer;
  volunteers: Array<Volunteer>;
};


export type QueryDutyArgs = {
  _id: Scalars['String'];
};


export type QueryRankArgs = {
  _id: Scalars['String'];
};


export type QueryVolunteerArgs = {
  _id: Scalars['String'];
};

export type Rank = {
  __typename?: 'Rank';
  _id: Scalars['ID'];
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type Volunteer = {
  __typename?: 'Volunteer';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type VolunteerfieldsFragment = (
  { __typename: 'Volunteer' }
  & Pick<Volunteer, '_id' | 'name'>
);

export type GetVolunteeersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVolunteeersQuery = (
  { __typename?: 'Query' }
  & { volunteers: Array<(
    { __typename?: 'Volunteer' }
    & VolunteerfieldsFragment
  )> }
);

export type DutyAllFieldsFragment = (
  { __typename?: 'Duty' }
  & Pick<Duty, '_id' | 'name' | 'isDeletable' | 'description'>
);

export type GetDutiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDutiesQuery = (
  { __typename?: 'Query' }
  & { duties: Array<(
    { __typename?: 'Duty' }
    & DutyAllFieldsFragment
  )> }
);

export type FindDutyQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FindDutyQuery = (
  { __typename?: 'Query' }
  & { duty: (
    { __typename?: 'Duty' }
    & DutyAllFieldsFragment
  ) }
);

export type EditDutyMutationVariables = Exact<{
  _id: Scalars['String'];
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
}>;


export type EditDutyMutation = (
  { __typename?: 'Mutation' }
  & { editDuty: (
    { __typename?: 'Duty' }
    & DutyAllFieldsFragment
  ) }
);

export type CreateDutyMutationVariables = Exact<{
  input: CreateDutyInput;
}>;


export type CreateDutyMutation = (
  { __typename?: 'Mutation' }
  & { createDuty: (
    { __typename?: 'Duty' }
    & DutyAllFieldsFragment
  ) }
);

export type DeleteDutyMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteDutyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDuty'>
);

export type RankAllFieldsFragment = (
  { __typename?: 'Rank' }
  & Pick<Rank, '_id' | 'name' | 'isDeletable' | 'description'>
);

export type GetRanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRanksQuery = (
  { __typename?: 'Query' }
  & { ranks: Array<(
    { __typename?: 'Rank' }
    & RankAllFieldsFragment
  )> }
);

export type FindRankQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FindRankQuery = (
  { __typename?: 'Query' }
  & { rank: (
    { __typename?: 'Rank' }
    & RankAllFieldsFragment
  ) }
);

export type EditRankMutationVariables = Exact<{
  _id: Scalars['String'];
  name: Scalars['String'];
  isDeletable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
}>;


export type EditRankMutation = (
  { __typename?: 'Mutation' }
  & { editRank: (
    { __typename?: 'Rank' }
    & RankAllFieldsFragment
  ) }
);

export type CreateRankMutationVariables = Exact<{
  input: CreateRankInput;
}>;


export type CreateRankMutation = (
  { __typename?: 'Mutation' }
  & { createRank: (
    { __typename?: 'Rank' }
    & RankAllFieldsFragment
  ) }
);

export type DeleteRankMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteRankMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRank'>
);

export type VolunteerAllFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, '_id' | 'name'>
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
  _id: Scalars['String'];
}>;


export type FindVolunteerQuery = (
  { __typename?: 'Query' }
  & { volunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerAllFieldsFragment
  ) }
);

export type EditVolunteerMutationVariables = Exact<{
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
}>;


export type EditVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { editVolunteer: (
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
  _id: Scalars['String'];
}>;


export type DeleteVolunteerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVolunteer'>
);

export const VolunteerfieldsFragmentDoc = gql`
    fragment volunteerfields on Volunteer {
  _id
  name
  __typename
}
    `;
export const DutyAllFieldsFragmentDoc = gql`
    fragment dutyAllFields on Duty {
  _id
  name
  isDeletable
  description
}
    `;
export const RankAllFieldsFragmentDoc = gql`
    fragment rankAllFields on Rank {
  _id
  name
  isDeletable
  description
}
    `;
export const VolunteerAllFieldsFragmentDoc = gql`
    fragment volunteerAllFields on Volunteer {
  _id
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
export const GetDutiesDocument = gql`
    query getDuties {
  duties {
    ...dutyAllFields
  }
}
    ${DutyAllFieldsFragmentDoc}`;
export type GetDutiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDutiesQuery, GetDutiesQueryVariables>, 'query'>;

    export const GetDutiesComponent = (props: GetDutiesComponentProps) => (
      <ApolloReactComponents.Query<GetDutiesQuery, GetDutiesQueryVariables> query={GetDutiesDocument} {...props} />
    );
    
export type GetDutiesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDutiesQuery, GetDutiesQueryVariables>
    } & TChildProps;
export function withGetDuties<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDutiesQuery,
  GetDutiesQueryVariables,
  GetDutiesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDutiesQuery, GetDutiesQueryVariables, GetDutiesProps<TChildProps, TDataName>>(GetDutiesDocument, {
      alias: 'getDuties',
      ...operationOptions
    });
};
export type GetDutiesQueryResult = ApolloReactCommon.QueryResult<GetDutiesQuery, GetDutiesQueryVariables>;
export const FindDutyDocument = gql`
    query findDuty($_id: String!) {
  duty(_id: $_id) {
    ...dutyAllFields
  }
}
    ${DutyAllFieldsFragmentDoc}`;
export type FindDutyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindDutyQuery, FindDutyQueryVariables>, 'query'> & ({ variables: FindDutyQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FindDutyComponent = (props: FindDutyComponentProps) => (
      <ApolloReactComponents.Query<FindDutyQuery, FindDutyQueryVariables> query={FindDutyDocument} {...props} />
    );
    
export type FindDutyProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindDutyQuery, FindDutyQueryVariables>
    } & TChildProps;
export function withFindDuty<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindDutyQuery,
  FindDutyQueryVariables,
  FindDutyProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindDutyQuery, FindDutyQueryVariables, FindDutyProps<TChildProps, TDataName>>(FindDutyDocument, {
      alias: 'findDuty',
      ...operationOptions
    });
};
export type FindDutyQueryResult = ApolloReactCommon.QueryResult<FindDutyQuery, FindDutyQueryVariables>;
export const EditDutyDocument = gql`
    mutation editDuty($_id: String!, $name: String!, $isDeletable: Boolean, $description: String) {
  editDuty(_id: $_id, name: $name, description: $description) {
    ...dutyAllFields
  }
}
    ${DutyAllFieldsFragmentDoc}`;
export type EditDutyMutationFn = ApolloReactCommon.MutationFunction<EditDutyMutation, EditDutyMutationVariables>;
export type EditDutyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditDutyMutation, EditDutyMutationVariables>, 'mutation'>;

    export const EditDutyComponent = (props: EditDutyComponentProps) => (
      <ApolloReactComponents.Mutation<EditDutyMutation, EditDutyMutationVariables> mutation={EditDutyDocument} {...props} />
    );
    
export type EditDutyProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditDutyMutation, EditDutyMutationVariables>
    } & TChildProps;
export function withEditDuty<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditDutyMutation,
  EditDutyMutationVariables,
  EditDutyProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditDutyMutation, EditDutyMutationVariables, EditDutyProps<TChildProps, TDataName>>(EditDutyDocument, {
      alias: 'editDuty',
      ...operationOptions
    });
};
export type EditDutyMutationResult = ApolloReactCommon.MutationResult<EditDutyMutation>;
export type EditDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<EditDutyMutation, EditDutyMutationVariables>;
export const CreateDutyDocument = gql`
    mutation createDuty($input: CreateDutyInput!) {
  createDuty(createDutyInput: $input) {
    ...dutyAllFields
  }
}
    ${DutyAllFieldsFragmentDoc}`;
export type CreateDutyMutationFn = ApolloReactCommon.MutationFunction<CreateDutyMutation, CreateDutyMutationVariables>;
export type CreateDutyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateDutyMutation, CreateDutyMutationVariables>, 'mutation'>;

    export const CreateDutyComponent = (props: CreateDutyComponentProps) => (
      <ApolloReactComponents.Mutation<CreateDutyMutation, CreateDutyMutationVariables> mutation={CreateDutyDocument} {...props} />
    );
    
export type CreateDutyProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateDutyMutation, CreateDutyMutationVariables>
    } & TChildProps;
export function withCreateDuty<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateDutyMutation,
  CreateDutyMutationVariables,
  CreateDutyProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateDutyMutation, CreateDutyMutationVariables, CreateDutyProps<TChildProps, TDataName>>(CreateDutyDocument, {
      alias: 'createDuty',
      ...operationOptions
    });
};
export type CreateDutyMutationResult = ApolloReactCommon.MutationResult<CreateDutyMutation>;
export type CreateDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDutyMutation, CreateDutyMutationVariables>;
export const DeleteDutyDocument = gql`
    mutation deleteDuty($_id: String!) {
  deleteDuty(_id: $_id)
}
    `;
export type DeleteDutyMutationFn = ApolloReactCommon.MutationFunction<DeleteDutyMutation, DeleteDutyMutationVariables>;
export type DeleteDutyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteDutyMutation, DeleteDutyMutationVariables>, 'mutation'>;

    export const DeleteDutyComponent = (props: DeleteDutyComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteDutyMutation, DeleteDutyMutationVariables> mutation={DeleteDutyDocument} {...props} />
    );
    
export type DeleteDutyProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteDutyMutation, DeleteDutyMutationVariables>
    } & TChildProps;
export function withDeleteDuty<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteDutyMutation,
  DeleteDutyMutationVariables,
  DeleteDutyProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteDutyMutation, DeleteDutyMutationVariables, DeleteDutyProps<TChildProps, TDataName>>(DeleteDutyDocument, {
      alias: 'deleteDuty',
      ...operationOptions
    });
};
export type DeleteDutyMutationResult = ApolloReactCommon.MutationResult<DeleteDutyMutation>;
export type DeleteDutyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDutyMutation, DeleteDutyMutationVariables>;
export const GetRanksDocument = gql`
    query getRanks {
  ranks {
    ...rankAllFields
  }
}
    ${RankAllFieldsFragmentDoc}`;
export type GetRanksComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetRanksQuery, GetRanksQueryVariables>, 'query'>;

    export const GetRanksComponent = (props: GetRanksComponentProps) => (
      <ApolloReactComponents.Query<GetRanksQuery, GetRanksQueryVariables> query={GetRanksDocument} {...props} />
    );
    
export type GetRanksProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetRanksQuery, GetRanksQueryVariables>
    } & TChildProps;
export function withGetRanks<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRanksQuery,
  GetRanksQueryVariables,
  GetRanksProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetRanksQuery, GetRanksQueryVariables, GetRanksProps<TChildProps, TDataName>>(GetRanksDocument, {
      alias: 'getRanks',
      ...operationOptions
    });
};
export type GetRanksQueryResult = ApolloReactCommon.QueryResult<GetRanksQuery, GetRanksQueryVariables>;
export const FindRankDocument = gql`
    query findRank($_id: String!) {
  rank(_id: $_id) {
    ...rankAllFields
  }
}
    ${RankAllFieldsFragmentDoc}`;
export type FindRankComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindRankQuery, FindRankQueryVariables>, 'query'> & ({ variables: FindRankQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FindRankComponent = (props: FindRankComponentProps) => (
      <ApolloReactComponents.Query<FindRankQuery, FindRankQueryVariables> query={FindRankDocument} {...props} />
    );
    
export type FindRankProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindRankQuery, FindRankQueryVariables>
    } & TChildProps;
export function withFindRank<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindRankQuery,
  FindRankQueryVariables,
  FindRankProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindRankQuery, FindRankQueryVariables, FindRankProps<TChildProps, TDataName>>(FindRankDocument, {
      alias: 'findRank',
      ...operationOptions
    });
};
export type FindRankQueryResult = ApolloReactCommon.QueryResult<FindRankQuery, FindRankQueryVariables>;
export const EditRankDocument = gql`
    mutation editRank($_id: String!, $name: String!, $isDeletable: Boolean, $description: String) {
  editRank(_id: $_id, name: $name, description: $description) {
    ...rankAllFields
  }
}
    ${RankAllFieldsFragmentDoc}`;
export type EditRankMutationFn = ApolloReactCommon.MutationFunction<EditRankMutation, EditRankMutationVariables>;
export type EditRankComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditRankMutation, EditRankMutationVariables>, 'mutation'>;

    export const EditRankComponent = (props: EditRankComponentProps) => (
      <ApolloReactComponents.Mutation<EditRankMutation, EditRankMutationVariables> mutation={EditRankDocument} {...props} />
    );
    
export type EditRankProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditRankMutation, EditRankMutationVariables>
    } & TChildProps;
export function withEditRank<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditRankMutation,
  EditRankMutationVariables,
  EditRankProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditRankMutation, EditRankMutationVariables, EditRankProps<TChildProps, TDataName>>(EditRankDocument, {
      alias: 'editRank',
      ...operationOptions
    });
};
export type EditRankMutationResult = ApolloReactCommon.MutationResult<EditRankMutation>;
export type EditRankMutationOptions = ApolloReactCommon.BaseMutationOptions<EditRankMutation, EditRankMutationVariables>;
export const CreateRankDocument = gql`
    mutation createRank($input: CreateRankInput!) {
  createRank(createRankInput: $input) {
    ...rankAllFields
  }
}
    ${RankAllFieldsFragmentDoc}`;
export type CreateRankMutationFn = ApolloReactCommon.MutationFunction<CreateRankMutation, CreateRankMutationVariables>;
export type CreateRankComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateRankMutation, CreateRankMutationVariables>, 'mutation'>;

    export const CreateRankComponent = (props: CreateRankComponentProps) => (
      <ApolloReactComponents.Mutation<CreateRankMutation, CreateRankMutationVariables> mutation={CreateRankDocument} {...props} />
    );
    
export type CreateRankProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateRankMutation, CreateRankMutationVariables>
    } & TChildProps;
export function withCreateRank<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateRankMutation,
  CreateRankMutationVariables,
  CreateRankProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateRankMutation, CreateRankMutationVariables, CreateRankProps<TChildProps, TDataName>>(CreateRankDocument, {
      alias: 'createRank',
      ...operationOptions
    });
};
export type CreateRankMutationResult = ApolloReactCommon.MutationResult<CreateRankMutation>;
export type CreateRankMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRankMutation, CreateRankMutationVariables>;
export const DeleteRankDocument = gql`
    mutation deleteRank($_id: String!) {
  deleteRank(_id: $_id)
}
    `;
export type DeleteRankMutationFn = ApolloReactCommon.MutationFunction<DeleteRankMutation, DeleteRankMutationVariables>;
export type DeleteRankComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteRankMutation, DeleteRankMutationVariables>, 'mutation'>;

    export const DeleteRankComponent = (props: DeleteRankComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteRankMutation, DeleteRankMutationVariables> mutation={DeleteRankDocument} {...props} />
    );
    
export type DeleteRankProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteRankMutation, DeleteRankMutationVariables>
    } & TChildProps;
export function withDeleteRank<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteRankMutation,
  DeleteRankMutationVariables,
  DeleteRankProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteRankMutation, DeleteRankMutationVariables, DeleteRankProps<TChildProps, TDataName>>(DeleteRankDocument, {
      alias: 'deleteRank',
      ...operationOptions
    });
};
export type DeleteRankMutationResult = ApolloReactCommon.MutationResult<DeleteRankMutation>;
export type DeleteRankMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRankMutation, DeleteRankMutationVariables>;
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
    query findVolunteer($_id: String!) {
  volunteer(_id: $_id) {
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
    mutation editVolunteer($_id: String!, $name: String) {
  editVolunteer(_id: $_id, name: $name) {
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
    mutation deleteVolunteer($_id: String!) {
  deleteVolunteer(_id: $_id)
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