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
                location: "",
                course: "",
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
            location: data.location,
            course: data.course_code
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
            };
        }

        return {
            login: data.login,
            lastname: data.lastname,
            firstname: data.firstname,
        };
    },
    getMarks: async (KeyAuth, login, scolaryear, codeModule) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/user/${login}/notes?&format=json`;
        var data = await fetch(url, { method: 'GET' }).then(res => res.json())
        if (data.message || data.error) {
            return {
                module: [],
                marks: []
            }
        }
        return {
            module: data.modules.filter(element => (scolaryear ? element.scolaryear == scolaryear : 1) && (codeModule ?  element.codemodule == codeModule : 1 )),
            marks: data.notes.filter(element =>  (scolaryear ? element.scolaryear == scolaryear : 1) && (codeModule ?  element.codemodule == codeModule : 1 ))
        }
    }
}
