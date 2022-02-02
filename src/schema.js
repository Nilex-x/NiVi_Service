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
    
    type Resp {
      title: String!,
      picture: String!
    }

    type activites {
        codeacti: String
        module_title: String
        title: String
        description: String
        type_title: String
        end_register: String
        deadline: String
        end: String
        register: String
        id_projet: String
        project_title: String
    }

    type moduleDetail {
        title: String!
        end_register: String!
        closed: String!
        opened: String!
        credits: Int!
        description: String!
        competence: String!
        resp: [Resp!]!
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
        salle: String
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

    type Planning {
        scolaryear: String!
        codemodule: String!
        codeinstance: String!
        codeacti: String!
        codeevent: String
        semester: Int
        titlemodule: String
        acti_title: String
        start: String
        end: String
        total_students_registered: Int
        title: String
        type_title: String
        type_code: String
        is_rdv: String
        nb_hours: String
        allowed_planning_start: String
        allowed_planning_end: String
        nb_group: Int
        nb_max_students_projet: Int
        salle: String
        nb_seat: String
        module_available: Boolean,
        module_registered: Boolean,
        past: Boolean,
        allow_register: Boolean,
        event_registered: Boolean,
        project: Boolean,
    }

    type EventType {
        code: String,
        seats: String,
        title:  String,
        description: String,
        nb_inscrits: String,
        begin: String,
        end: String,
        location: String,
        user_status: String,
        resp: [Resp!]
    }

    type ActiType {
        module_title: String!,
        title: String!,
        description: String,
        type_title: String,
        type_code: String,
        begin: String,
        start: String,
        end_register: String,
        deadline: String,
        end: String,
        nb_hours: String,
        nb_group: Int,
        num: Int
        register:  Boolean,
        is_projet: Boolean,
        is_note: Boolean,
        nb_notes: String,
        rdv_status: String,
        archive: String,
        nb_planified: Int,
        student_registered: Int,
        events: [EventType!]
    }

    type Query {
        Login(KeyAuth: String!): User!
        GetAllModule(KeyAuth: String!, start: String!, end: String!): [Module]!
        GetModuleDetail(KeyAuth: String!, scolaryear: String!, codemodule: String!, codeinstance: String!, codeActi: String): moduleDetail!
        GetActiDetail(KeyAuth: String!, scolaryear: String!, codemodule: String!, codeinstance: String!, codeActi: String): ActiType!
        GetUserInfo(KeyAuth: String!): User!
        GetBoard(KeyAuth: String!): Board!
        GetPlanning(KeyAuth: String!): [Planning]!
    }
`

module.exports = typeDefs