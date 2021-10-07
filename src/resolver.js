const { getPlanning } = require("./intraApi/Planning/getPlanning");
const { getUserInfo } = require("./intraApi/UserInfo/GetInfo");

const resolvers = {
    Query: {
        GetPlanning: async (_, { KeyAuth }, { dataSources }) => {
            return getPlanning(KeyAuth)
        },
        GetUserInfo: async (_, {KeyAuth}, {dataSources}) => {
            return getUserInfo(KeyAuth)
        }
    }
};

module.exports = resolvers