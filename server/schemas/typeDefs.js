const { gql } = require('apollo-server-express')

const typeDefs = gql `

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Books {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type BookData {
    authors: [String!]
    description: String!
    title: String!
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedBooks(bookData:BookData!):User
    removeBook(bookId: String!): User
}
`
// export the typeDefs
module.exports = typeDefs;
// bookId: String!, image: String!, link: String!): User