const fetch = require('node-fetch')

module.exports = {
    getPlanning: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/planning/load?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        return 1;
    },
    getMyPlannig: (KeyAuth) => {
        const url = `${process.env.API_INTRA}${KeyAuth}/planing/my-schedules`;
    }
}