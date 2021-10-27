const { getBoard } = require("./intraApi/Board/getBoard");
const { getModuleAll, getModuleDetails, getActiDetails } = require("./intraApi/Module/GetModule");
const { getPlanning } = require("./intraApi/Planning/getPlanning");
const { getUserInfo, LoginUser } = require("./intraApi/UserInfo/GetInfo");
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

const resolvers = {
    Query: {
        Login: async (_, { KeyAuth }, { dataSources }) => {
            return LoginUser(KeyAuth)
        },
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