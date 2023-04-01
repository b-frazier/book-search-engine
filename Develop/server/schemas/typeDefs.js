const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: string
    email: string
    password: string
    savedBooks: [Book]
  }

  type Query {
    me: [User]
  }
`;
module.exports = typeDefs;
