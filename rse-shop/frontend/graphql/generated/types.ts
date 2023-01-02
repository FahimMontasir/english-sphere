export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  age: Scalars['Int'];
  name: Scalars['String'];
  nationality?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  name: Scalars['String'];
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<User>;
  updateUsername?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUsernameArgs = {
  input: UpdateUsername;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: UserResult;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdateUsername = {
  id: Scalars['ID'];
  newUserName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  favoriteMovies?: Maybe<Array<Maybe<Movie>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  nationality: Scalars['String'];
  username: Scalars['String'];
};

export type UserErrorResult = {
  __typename?: 'UserErrorResult';
  message: Scalars['String'];
};

export type UserResult = UserErrorResult | UserSuccessResult;

export type UserSuccessResult = {
  __typename?: 'UserSuccessResult';
  users: Array<User>;
};

export type GetAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserQuery = { __typename?: 'Query', users: { __typename?: 'UserErrorResult', message: string } | { __typename?: 'UserSuccessResult', users: Array<{ __typename?: 'User', id: string, name: string, username: string }> } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, id: string, username: string } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string, age: number, username: string } };
