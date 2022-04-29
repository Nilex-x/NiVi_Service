const { getBoard } = require("./intraApi/Board/getBoard");
const { getModuleAll, getModuleDetails, getActiDetails, getProjectDetails, UnregisterProject, getModules } = require("./intraApi/Module/GetModule");
const { getPlanning, getDayEvents, RegisterActi, UnregisterActi } = require("./intraApi/Planning/getPlanning");
const { getUserInfo, LoginUser, getMarks } = require("./intraApi/UserInfo/GetInfo");

const resolvers = {
    Query: {
        Login: async (_, { KeyAuth }, { dataSources }) => {
            return LoginUser(KeyAuth)
        },
        GetMarks: async (_, { KeyAuth }, { dataSources }) => {
            return getMarks(KeyAuth, (await LoginUser(KeyAuth)).login)
        },
        GetPlanning: async (_, { KeyAuth }, { dataSources }) => {
            return getPlanning(KeyAuth);
        },
        GetDayEvent: async (_, { KeyAuth, start, country, city }, { dataSources }) => {
            return getDayEvents(KeyAuth, start, country, city);
        },
        GetActiDetail: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return getActiDetails(KeyAuth, scolaryear, codemodule, codeinstance, codeActi)
        },
        GetAllModule: async (_, { KeyAuth, start, end }, { dataSources }) => {
            return getModuleAll(KeyAuth, start, end);
        },
        GetModuleDetail: async (_, { KeyAuth, scolaryear, codemodule, codeinstance }, { dataSources }) => {
            return getModuleDetails(KeyAuth, scolaryear, codemodule, codeinstance);
        },
        GetProjectDetails: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return getProjectDetails(KeyAuth, scolaryear, codemodule, codeinstance, codeActi);
        },
        GetUserInfo: async (_, { KeyAuth }, { dataSources }) => {
            return getUserInfo(KeyAuth);
        },
        GetBoard: async (_, { KeyAuth }, { dataSources }) => {
            return getBoard(KeyAuth);
        },
        GetModules: async (_ , { KeyAuth }, { dataSources }) => {
            return getModules(KeyAuth);
        }
    },

    Mutation: {
        RegisterActi: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent }, { dataSources }) => {
            return RegisterActi(KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent);
        },
        UnregisterActi: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent }, { dataSources }) => {
            return UnregisterActi(KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent);
        },
        RegisterProject: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return "Not Done";
        },
        UnregisterProject: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return UnregisterProject(KeyAuth, scolaryear, codemodule, codeinstance, codeActi);
        }
    }
};

module.exports = resolvers