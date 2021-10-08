const fetch = require('node-fetch')

const getPictureUrl = (fakeUrl, KeyAuth) => {
    const cleanUrl = fakeUrl.replace("\\", "")
    return (`${process.env.API_INTRA}/${KeyAuth}${cleanUrl}`)
}

module.exports = {
    getUserInfo: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/user?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        console.log("data =>", data)
        if (data.message || data.error) {
            return {
                login: "",
                lastname: "",
                firstname: "",
                picture: "",
                semester: 0,
                promo: 0,
                studentyear: "",
                credits: 0,
                gpa: "",
                scolaryear: "",
            };
        }
        return {
            login: data.login,
            lastname: data.lastname,
            firstname: data.firstname,
            picture: getPictureUrl(data.picture, KeyAuth),
            semester: data.semester,
            promo: data.promo,
            studentyear: data.studentyear,
            credits: data.credits,
            gpa: data.gpa[0].gpa,
            scolaryear: data.scolaryear,
        };
    }
}