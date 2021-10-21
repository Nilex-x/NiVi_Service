const { gql } = require("apollo-server-core");

const typeDefs = gql`
    type User {
        login: String!,
        lastname: String!,
        firstname: String!,
        picture: String,
        semester: Int,
        promo: Int,
        studentyear: String,!
        credits: Int!,
        gpa: String!,
        scolaryear: String!,
    }

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

    type Projects {
        title: String!
        code_acti: String!
        code_module: String!
        scolaryear: String!
        codeinstance: String!
        timeline_start: String!
        timeline_end: String!
        timeline_barre: Float!
    }
    
    type Notes {
        title: String!
        code_acti: String!
        code_module: String!
        scolaryear: String!
        codeinstance: String!
        note: String!
        noteur: String!
    }

    type ActivitesBoard {
        title: String!
        code_acti: String!
        code_module: String!
        scolaryear: String!
        codeinstance: String!
        module: String!
        timeline_start: String!
        timeline_end: String!
        timeline_barre: Float!
        salle: String!
        registerLink: String!
    }

    type UserHistory {
        picture: String
        title: String!
    }

    type History {
        title: String!
        user: UserHistory!
        content: String!
        date: String!
    }

    type Board {
        projets: [Projects!]
        notes: [Notes!]
        activites: [ActivitesBoard!]
        historys: [History!]
    }

    type Query {
        GetPlanning(KeyAuth: String!): Int
        GetAllModule(KeyAuth: String!, start: String!, end: String!): [Module]!
        GetModuleDetail(KeyAuth: String!, scolaryear: String!, codemodule: String!, codeinstance: String!, codeActi: String): moduleDetail!
        GetUserInfo(KeyAuth: String!): User!
        GetBoard(KeyAuth: String!): Board!
    }
`

module.exports = typeDefs