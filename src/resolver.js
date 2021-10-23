const { getBoard } = require("./intraApi/Board/getBoard");
const { getModuleAll, getModuleDetails, getActiDetails } = require("./intraApi/Module/GetModule");
const { getPlanning } = require("./intraApi/Planning/getPlanning");
const { getUserInfo } = require("./intraApi/UserInfo/GetInfo");

const resolvers = {
    Query: {
        GetPlanning: async (_, { KeyAuth }, { dataSources }) => {
            return getPlanning(KeyAuth);
        },
        GetActiDetail: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return getActiDetails(KeyAuth, scolaryear, codemodule, codeinstance, codeActi)
        },
        GetAllModule: async (_, { KeyAuth, start, end }, { dataSources }) => {
            return getModuleAll(KeyAuth, start, end);
        },
        GetModuleDetail: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return getModuleDetails(KeyAuth, scolaryear, codemodule, codeinstance, codeActi);
        },
        GetUserInfo: async (_, { KeyAuth }, { dataSources }) => {
            return getUserInfo(KeyAuth);
        },
        GetBoard: async (_, { KeyAuth }, { dataSources }) => {
            return getBoard(KeyAuth);
        }
    }
};

module.exports = resolvers