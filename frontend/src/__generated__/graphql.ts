/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddLinkInput = {
  order: Scalars['Int']['input'];
  show_icon: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  uploaded_icon?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
  user_id: Scalars['Int']['input'];
};

export type AddUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type EditThemeInput = {
  background_color?: InputMaybe<Scalars['String']['input']>;
  bio_color?: InputMaybe<Scalars['String']['input']>;
  frame_active?: InputMaybe<Scalars['Boolean']['input']>;
  frame_blur?: InputMaybe<Scalars['String']['input']>;
  frame_blur_amount?: InputMaybe<Scalars['String']['input']>;
  frame_color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title_color?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['Int']['input'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  show_icon: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  uploaded_icon?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLink?: Maybe<Link>;
  addUser?: Maybe<User>;
  deleteLink?: Maybe<Link>;
  editBackground?: Maybe<User>;
  editTheme?: Maybe<Theme>;
  removeImage?: Maybe<Link>;
  updateLink?: Maybe<Link>;
  updateUser?: Maybe<User>;
};


export type MutationAddLinkArgs = {
  value: AddLinkInput;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationDeleteLinkArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditBackgroundArgs = {
  action: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditThemeArgs = {
  value: EditThemeInput;
};


export type MutationRemoveImageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateLinkArgs = {
  value: UpdateLinkInput;
};


export type MutationUpdateUserArgs = {
  value: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUserWithUsername?: Maybe<User>;
  link?: Maybe<Link>;
  links?: Maybe<Array<Maybe<Link>>>;
  themes?: Maybe<Array<Maybe<Theme>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserWithUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryLinkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLinksArgs = {
  id: Scalars['Int']['input'];
};


export type QueryThemesArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Theme = {
  __typename?: 'Theme';
  background?: Maybe<Scalars['String']['output']>;
  background_color: Scalars['String']['output'];
  bio_color: Scalars['String']['output'];
  frame_active: Scalars['Boolean']['output'];
  frame_blur: Scalars['String']['output'];
  frame_blur_amount: Scalars['String']['output'];
  frame_color: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title_color: Scalars['String']['output'];
  user: User;
};

export type UpdateLinkInput = {
  id: Scalars['Int']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  show_icon?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uploaded_icon?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_title?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  links?: Maybe<Array<Link>>;
  name: Scalars['String']['output'];
  premium?: Maybe<Scalars['Boolean']['output']>;
  privacy?: Maybe<Scalars['String']['output']>;
  profile_title: Scalars['String']['output'];
  themes?: Maybe<Array<Theme>>;
  username?: Maybe<Scalars['String']['output']>;
};

export type GetUserQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', bio?: string | null, email: string, id: number, image: string, name: string, username?: string | null, profile_title: string } | null };

export type GetUserWithLinkQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserWithLinkQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', bio?: string | null, email: string, id: number, image: string, name: string, username?: string | null, profile_title: string, premium?: boolean | null, privacy?: string | null, links?: Array<{ __typename?: 'Link', id: number, title: string, order: number, url: string, uploaded_icon?: string | null, show_icon: boolean }> | null } | null };

export type GetUsernameUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUsernameUserQuery = { __typename?: 'Query', getUserWithUsername?: { __typename?: 'User', id: number, email: string, username?: string | null, name: string, bio?: string | null, image: string, profile_title: string, premium?: boolean | null, privacy?: string | null, links?: Array<{ __typename?: 'Link', id: number, order: number, title: string, url: string, show_icon: boolean, uploaded_icon?: string | null }> | null } | null };

export type AddUserMutationMutationVariables = Exact<{
  user: AddUserInput;
}>;


export type AddUserMutationMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'User', id: number, image: string, name: string } | null };

export type MutationMutationVariables = Exact<{
  value: UpdateUserInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: number, email: string, username?: string | null } | null };

export type AddLinkMutationMutationVariables = Exact<{
  value: AddLinkInput;
}>;


export type AddLinkMutationMutation = { __typename?: 'Mutation', addLink?: { __typename?: 'Link', id: number, order: number, show_icon: boolean, title: string, uploaded_icon?: string | null, url: string } | null };

export type UpdateLinkMutationMutationVariables = Exact<{
  value: UpdateLinkInput;
}>;


export type UpdateLinkMutationMutation = { __typename?: 'Mutation', updateLink?: { __typename?: 'Link', id: number } | null };

export type RemoveImageMutationMutationVariables = Exact<{
  removeImageId: Scalars['Int']['input'];
}>;


export type RemoveImageMutationMutation = { __typename?: 'Mutation', removeImage?: { __typename?: 'Link', id: number } | null };

export type DeleteLinkMutationMutationVariables = Exact<{
  removeImageId: Scalars['Int']['input'];
}>;


export type DeleteLinkMutationMutation = { __typename?: 'Mutation', deleteLink?: { __typename?: 'Link', id: number } | null };

export type EditBackgroundMutationMutationVariables = Exact<{
  editBackgroundId: Scalars['Int']['input'];
  action: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditBackgroundMutationMutation = { __typename?: 'Mutation', editBackground?: { __typename?: 'User', id: number } | null };


export const GetUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile_title"}}]}}]}}]} as unknown as DocumentNode<GetUserQueryQuery, GetUserQueryQueryVariables>;
export const GetUserWithLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserWithLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_icon"}},{"kind":"Field","name":{"kind":"Name","value":"show_icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile_title"}},{"kind":"Field","name":{"kind":"Name","value":"premium"}},{"kind":"Field","name":{"kind":"Name","value":"privacy"}}]}}]}}]} as unknown as DocumentNode<GetUserWithLinkQuery, GetUserWithLinkQueryVariables>;
export const GetUsernameUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsernameUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserWithUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"profile_title"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"show_icon"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"premium"}},{"kind":"Field","name":{"kind":"Name","value":"privacy"}}]}}]}}]} as unknown as DocumentNode<GetUsernameUserQuery, GetUsernameUserQueryVariables>;
export const AddUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddUserMutationMutation, AddUserMutationMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const AddLinkMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLinkMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"show_icon"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AddLinkMutationMutation, AddLinkMutationMutationVariables>;
export const UpdateLinkMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLinkMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLinkMutationMutation, UpdateLinkMutationMutationVariables>;
export const RemoveImageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveImageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeImageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveImageMutationMutation, RemoveImageMutationMutationVariables>;
export const DeleteLinkMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLinkMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeImageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteLinkMutationMutation, DeleteLinkMutationMutationVariables>;
export const EditBackgroundMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditBackgroundMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editBackgroundId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editBackground"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editBackgroundId"}}},{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EditBackgroundMutationMutation, EditBackgroundMutationMutationVariables>;