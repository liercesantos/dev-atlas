import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($skip: Int, $take: Int, $search: String, $tag: String, $published: Boolean) {
    projects(skip: $skip, take: $take, search: $search, tag: $tag, published: $published) {
      items {
        id
        title
        description
        imageUrl
        tags
        published
        createdAt
      }
      total
      skip
      take
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      title
      description
      content
      imageUrl
      repoUrl
      liveUrl
      tags
      published
      authorId
      createdAt
      updatedAt
    }
  }
`;
