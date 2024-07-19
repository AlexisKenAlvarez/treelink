/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetUserQuery($email: String!) {\n    getUser(email: $email) {\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n": types.GetUserQueryDocument,
    "\n  query GetUserWithLink($email: String!) {\n    getUser(email: $email) {\n      links {\n        id\n        title\n        order\n        url\n        uploaded_icon\n        show_icon\n      }\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n": types.GetUserWithLinkDocument,
    "\n  mutation AddUserMutation($user: AddUserInput!) {\n    addUser(user: $user) {\n      id\n      image\n      name\n    }\n  }\n": types.AddUserMutationDocument,
    "\n  mutation Mutation($oldValue: UpdateUserInput!, $newValue: UpdateUserInput!) {\n    updateUser(oldValue: $oldValue, newValue: $newValue) {\n      username\n      id\n    }\n  }\n": types.MutationDocument,
    "\n  mutation AddLinkMutation($value: AddLinkInput!) {\n  addLink(value: $value) {\n    order\n    show_icon\n    title\n    uploaded_icon\n    url\n  }\n}\n  ": types.AddLinkMutationDocument,
    "\n  mutation UpdateLinkMutation($value: UpdateLinkInput!) {\n  updateLink(value: $value) {\n    id\n  }\n}": types.UpdateLinkMutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserQuery($email: String!) {\n    getUser(email: $email) {\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n"): (typeof documents)["\n  query GetUserQuery($email: String!) {\n    getUser(email: $email) {\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserWithLink($email: String!) {\n    getUser(email: $email) {\n      links {\n        id\n        title\n        order\n        url\n        uploaded_icon\n        show_icon\n      }\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n"): (typeof documents)["\n  query GetUserWithLink($email: String!) {\n    getUser(email: $email) {\n      links {\n        id\n        title\n        order\n        url\n        uploaded_icon\n        show_icon\n      }\n      bio\n      email\n      id\n      image\n      name\n      username\n      profile_title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUserMutation($user: AddUserInput!) {\n    addUser(user: $user) {\n      id\n      image\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation AddUserMutation($user: AddUserInput!) {\n    addUser(user: $user) {\n      id\n      image\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation($oldValue: UpdateUserInput!, $newValue: UpdateUserInput!) {\n    updateUser(oldValue: $oldValue, newValue: $newValue) {\n      username\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($oldValue: UpdateUserInput!, $newValue: UpdateUserInput!) {\n    updateUser(oldValue: $oldValue, newValue: $newValue) {\n      username\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddLinkMutation($value: AddLinkInput!) {\n  addLink(value: $value) {\n    order\n    show_icon\n    title\n    uploaded_icon\n    url\n  }\n}\n  "): (typeof documents)["\n  mutation AddLinkMutation($value: AddLinkInput!) {\n  addLink(value: $value) {\n    order\n    show_icon\n    title\n    uploaded_icon\n    url\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateLinkMutation($value: UpdateLinkInput!) {\n  updateLink(value: $value) {\n    id\n  }\n}"): (typeof documents)["\n  mutation UpdateLinkMutation($value: UpdateLinkInput!) {\n  updateLink(value: $value) {\n    id\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;