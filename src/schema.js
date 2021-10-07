const { gql } = require("apollo-server-core");

const typeDefs = gql`

    type Module {
        title_module: String!
        code_module: String!
        scolaryear: String!
        codeinstance: String!
        type_acti: String!
        title_acti: String!
        code_acti: String!
        begin_mod: String!
        end_mod: String!
        registered: Boolean!
    }

    type Student {
        login: String!
        name: String!
        picture: String!
        promo: Int!
    }
    
    type resp {
      title: String!,
      picture: String!
    }

    type activites {
        codeacti: String!
        module_title: String!
        title: String!
        description: String!
        type_title: String!
        end_register: String!
        deadline: String!
        end: String!
        register: String!
        id_projet: String!
        project_title: String!
    }

    type moduleDetail {
        title: String!
        end_register: String!
        closed: String!
        opened: String!
        credits: Int!
        description: String!
        competence: String!
        resp: [resp!]!
        allow_register: String
        color: String
        activites: [activites!]!
        studentRegistered: [Student]!
        file: [String!]!
    }

    type Query {
        GetPlanning(KeyAuth: String!): Int
        GetUserInfo(KeyAuth: String!): Int
        GetAllModule(KeyAuth: String!, start: String!, end: String!): [Module]!
        GetModuleDetail(KeyAuth: String!, scolaryear: String!, codemodule: String!, codeinstance: String!, codeActi: String): moduleDetail!
    }
`

module.exports = typeDefs