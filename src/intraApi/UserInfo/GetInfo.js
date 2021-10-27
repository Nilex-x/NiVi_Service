const fetch = require('node-fetch')
const userModel = require("../../models/userModel")

const getPictureUrl = (fakeUrl, KeyAuth) => {
    const cleanUrl = fakeUrl.replace("\\", "")
    return (`${process.env.API_INTRA}/${KeyAuth}${cleanUrl}`)
}

let GenerateId = () => {
    let generate = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return generate() + generate() + '-' + generate() + '-' + generate() + '-' + generate() + '-' + generate() + generate() + generate();
}

module.exports = {
    getUserInfo: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/user?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
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
    },
    LoginUser: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/user?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        if (data.message || data.error) {
            return {
                login: "",
                lastname: "",
                firstname: "",
                semester: 0,
            };
        }

        const users = await userModel.find({ login: data.login })

        if (users.length == 0) {
            const user = new userModel({
                _id: GenerateId(),
                login: data.login,
                lastname: data.lastname,
                firstname: data.firstname,
            })
            await user.save()
        }

        return {
            login: data.login,
            lastname: data.lastname,
            firstname: data.firstname,
            studentyear: data.studentyear,
        };
    }
}