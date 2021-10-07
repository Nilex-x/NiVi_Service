const fetch = require('node-fetch')

const getPictureUrl = (fakeUrl, KeyAuth) => {
    const cleanUrl = fakeUrl.replace("\\", "")
    return (`${process.env.API_INTRA}${KeyAuth}${cleanUrl}`)
}

module.exports = {
    getUserInfo: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}${KeyAuth}/user?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        console.log("data =>", data)
        return {
            login: data.login,
            lastname: data.lastname,
            firstname: data.firstname,
            picture: getPictureUrl(data.picture, KeyAuth),
            promo: data.promo,
            studentyear: data.studentyear,
            credits: data.credits,
            gpa: data.gpa[0].gpa,
            scolaryear: data.scolaryear,
        };
    }
}