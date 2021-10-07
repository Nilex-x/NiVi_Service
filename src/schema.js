const { gql } = require("apollo-server-core");

const typeDefs = gql`
    type User {
        login: String!,
        lastname: String!,
        firstname: String!,
        picture: String,
        semester: Int!,
        promo: Int,
        studentyear: String,!
        credits: Int!,
        gpa: String!,
        scolaryear: String!,
    }

    type Query {
        GetPlanning(KeyAuth: String!): Int
        GetUserInfo(KeyAuth: String!): User!
    }
`

module.exports = typeDefs