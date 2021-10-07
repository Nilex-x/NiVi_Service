const { getPlanning } = require("./intraApi/Planning/getPlanning");
const GetInfo = require("./intraApi/UserInfo/GetInfo");

const resolvers = {
    Query: {
        GetPlanning: async (_, { KeyAuth }, { dataSources }) => {
            return getPlanning(KeyAuth)
        },
        GetInfoUser: async (_, {KeyAuth}, {dataSources}) => {
            return GetInfo
        }
    }
};

module.exports = resolvers