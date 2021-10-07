const { gql } = require("apollo-server-core");

const typeDefs = gql`

    type Query {
        GetPlanning(KeyAuth: String): Int
        GetUserInfo(KeyAuth: String): Int
    }
`

module.exports = typeDefs