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
                averageLogTime: 0
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
            course: data.course_code,
            averageLogTime: data.nsstat.active / data.nsstat.nslog_norm,
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
    getMarks: async (KeyAuth, login) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/user/${login}/notes?&format=json`;
        var data = await fetch(url, { method: 'GET' }).then(res => res.json())
        if (data.message || data.error) {
            return {
                module: [],
                marks: []
            }
        }
        const userHistorys = data.modules.map(element => element.scolaryear)
        const userHistory = userHistorys.filter((v, i) => userHistorys.indexOf(v) === i)
        const modules = []
        userHistory.forEach(element => {
            const module = data.modules.filter(mod => mod.scolaryear == element)
            const notes = data.notes.filter(not => not.scolaryear == element);
            const semester = [... new Set(module.map(v1 => parseInt(v1.codeinstance.split('-')[1])).sort((a, b) => a - b))]
            modules.push({semester: `semester ${semester[0] + "/" + semester[1]}`, notes: notes.filter(v1 => v1.codeinstance.split('-')[1] == semester[0] || v1.codeinstance.split('-')[1] == semester[1]), modules: module.filter(v1 => v1.codeinstance.split('-')[1] == semester[0] || v1.codeinstance.split('-')[1] == semester[1])})
            modules.push({semester: `semester ${semester[2]}`, notes: notes.filter(v1 => v1.codeinstance.split('-')[1] == semester[2]), modules: module.filter(v1 => v1.codeinstance.split('-')[1] == semester[2])})
        })
        return modules
    }
}
