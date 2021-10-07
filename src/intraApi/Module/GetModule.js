const fetch = require('node-fetch')

const getModuleUserRegister = async (KeyAuth, scolaryear, codemodule, codeinstance) => {
    const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/registered?&format=json`;
    const response = await fetch(url)
    const data = await response.json()
    const allStudent = []
    data.map(student => {
        allStudent.push({
            login: student.login,
            picture: "\/file\/userprofil\/antoine.brunet@epitech.eu.bmp",
            name: student.title,
            promo: student.promo,
        })
    })
    return allStudent;
}

const getFileUrl = (fakeUrl) => {
    const cleanUrl = fakeUrl.replace("\\", "")
    return (`${process.env.API_INTRA}${cleanUrl}`)
}

const getFile = async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi) => {
    const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/project/file/?&format=json`;
    const response = await fetch(url)
    const data = await response.json()
    const files = []
    try {
        data.map(file => {
            files.push(getFileUrl(file.fullpath))
        })
        return (files)
    } catch (err) {
        console.error("API ERROR", err)
        return ([])
    }
}

module.exports = {
    getModuleAll: async (KeyAuth, start, end) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/board?&format=json&start=${start}&end=${end}`;
        const response = await fetch(url)
        const data = await response.json()
        const returnArray = []
        data.map(module => {
            returnArray.push({
                title_module: module.title_module,
                code_module: module.codemodule,
                scolaryear: module.scolaryear,
                codeinstance: module.codeinstance,
                type_acti: module.type_acti,
                title_acti: module.acti_title,
                code_acti: module.codeacti,
                begin_mod: module.begin_acti,
                end_mod: module.end_acti,
                registered: module.registered == 1 ? true : false
            })
        })
        return returnArray;
    },
    getModuleDetails: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        const projectDetail = {
            title: data.title,
            end_register: data.end_register,
            closed: data.closed,
            opened: data.opened,
            credits: data.credits,
            description: data.description,
            competence: data.competence,
            resp: data.resp,
            allow_register: data.allow_register,
            color: data.color,
            activites: data.activites,
            studentRegistered: getModuleUserRegister(KeyAuth, scolaryear, codemodule, codeinstance),
            file: codeActi ? await getFile(KeyAuth, scolaryear, codemodule, codeinstance, codeActi) : []
        }
        return projectDetail;
    }
}