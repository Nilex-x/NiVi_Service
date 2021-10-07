const fetch = require('node-fetch')

module.exports = {
    GetUserInfo: (KeyAuth) => {
        const url = `${process.env.API_INTRA}${KeyAuth}/planning/load?&format=json`;
        console.log("entry url =>", url)
        const response = await fetch(url)
        const data = await response.json()
        console.log("data =>", data)
        return 1;
    }
}