const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: string
    email: string
    password: string
    savedBooks: [bookSchema]
  }

  type Query {
    users: [User]
    books: [bookSchema]
  }
`;
module.exports = typeDefs;
