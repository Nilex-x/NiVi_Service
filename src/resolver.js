const { getModuleAll, getModuleDetails } = require("./intraApi/Module/GetModule");
const { getPlanning } = require("./intraApi/Planning/getPlanning");
const { getUserInfo } = require("./intraApi/UserInfo/GetInfo");

const resolvers = {
    Query: {
        GetPlanning: async (_, { KeyAuth }, { dataSources }) => {
            return getPlanning(KeyAuth)
        },
        GetAllModule: async (_, { KeyAuth, start, end }, { dataSources }) => {
            return getModuleAll(KeyAuth, start, end)
        },
        GetModuleDetail: async (_, { KeyAuth, scolaryear, codemodule, codeinstance, codeActi }, { dataSources }) => {
            return getModuleDetails(KeyAuth, scolaryear, codemodule, codeinstance, codeActi)
        },
        GetUserInfo: async (_, {KeyAuth}, {dataSources}) => {
            return getUserInfo(KeyAuth)
        }
    }
};

module.exports = resolvers