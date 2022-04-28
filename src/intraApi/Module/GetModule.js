const fetch = require('node-fetch')
const { getUserInfo } = require('../UserInfo/GetInfo')

const getPictureUrl = (fakeUrl, KeyAuth) => {
    const cleanUrl = fakeUrl.replace("\\", "")
    return (`${process.env.API_INTRA}/${KeyAuth}${cleanUrl}`)
}

const getModuleUserRegister = async (KeyAuth, scolaryear, codemodule, codeinstance) => {
    const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/registered?&format=json`;
    const response = await fetch(url)
    const data = await response.json()
    const allStudent = []
    if (data.length > 0) {
        data.map(student => {
            allStudent.push({
                login: student.login,
                picture: "\/file\/userprofil\/antoine.brunet@epitech.eu.bmp",
                name: student.title,
                promo: student.promo,
            })
        })
    }
    return allStudent;
}

const getUserRegister = async (users, KeyAuth) => {
    const allStudent = []
    // console.log("nice =>", users)
    users.map(student => {
        allStudent.push({
            login: student.master.login,
            picture: student.master.picture ? getPictureUrl(student.master.picture, KeyAuth) : "",
            name: student.master.title,
            promo: student.master.promo,
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
    if (data.length > 0) {
        data.map(file => {
            files.push(getFileUrl(file.fullpath))
        })
    }
    return (files)
}

const getAssit = (assists) => {
    const resp = assists.map(assist => {
        return {
            title: assist.title,
            picture: "" // "nicolas1.moreel-lebon.bmp", find link about picture
        }
    })
    return resp
}

const getEvents = (events) => {
    const value = events.map(event => {
        // console.log(events, event);
        let arraySalle = ""
        if (event.location) {
            arraySalle = event.location.split('/')
        }
        return {
            code: event.code,
            seats: event.seats,
            title: event.title,
            registed: event.already_register ? true : false,
            description: event.description,
            nb_inscrits: event.nb_inscrits,
            begin: event.begin.split(' ')[0] + "T" + event.begin.split(' ')[1],
            end: event.end.split(' ')[0] + "T" + event.end.split(' ')[1],
            location: arraySalle[arraySalle.length - 1],
            user_status: event.user_status,
            resp: getAssit(event.assistants)
        }
    })
    return value
}

module.exports = {
    getModules: async (KeyAuth) => {
        const { scolaryear, location, course } = await getUserInfo(KeyAuth)
        const loc = location.split('/');
        const cou = course.split('/');
        const url = `https://intra.epitech.eu/${KeyAuth}/course/filter?format=json&location%5B%5D=${loc[0]}&location%5B%5D=${loc[0]}%2F${loc[1]}&course%5B%5D=${cou[0]}%2F${cou[1]}&scolaryear%5B%5D=${scolaryear}`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log("data =>", data)
        const modules = data.map(element => ({
            semester: element.semester,
            begin: element.begin,
            end: element.end,
            scolaryear: element.scolaryear,
            code: element.code,
            codeinstance: element.codeinstance,
            status: element.status,
            title: element.title,
            credits: element.credits,
            open: element.open
        }));
        return modules;
    },
    getModuleAll: async (KeyAuth, start, end) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/board?&format=json&start=${start}&end=${end}`;
        const response = await fetch(url)
        const data = response.json()
        const returnArray = []
        if (data.length > 0) {
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
        } else {
            return []
        }
        return returnArray;
    },
    getProjectDetails: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/project/?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        const projectDetails = {
            scolaryear: data.scolaryear,
            codemodule: data.codemodule,
            codeinstance: data.codeinstance,
            codeacti: data.codeacti,
            begin: data.begin,
            start: data.start,
            end: data.end,
            register: data.register,
            title: data.title,
            description: data.description,
            registered: getUserRegister(data.registered, KeyAuth)
        }
        return projectDetails;
    },
    getModuleDetails: async (KeyAuth, scolaryear, codemodule, codeinstance) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.activites[0])
        const projectDetail = {
            title: data.title,
            end_register: data.end_register,
            closed: data.closed,
            opened: data.opened,
            credits: data.credits,
            description: (data.description ? data.description : ""),
            resp: data.resp,
            allow_register: data.allow_register,
            color: data.color,
            activites: data.activites,
            studentRegistered: getModuleUserRegister(KeyAuth, scolaryear, codemodule, codeinstance),
            file: [], // codeActi ? await getFile(KeyAuth, scolaryear, codemodule, codeinstance)
        }
        return projectDetail;
    },
    getActiDetails: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        const ActiDetail = {
            module_title: data.module_title,
            title: data.title,
            description: data.description,
            type_title: data.type_title,
            tupe_code: data.type_code,
            begin: data.begin,
            start: data.start,
            end_register: data.end_register ? data.end_register : "",
            deadline: data.deadline ? data.deadline : "",
            end: data.end,
            nb_hours: data.nb_hours,
            nb_group: data.nb_group,
            num: data.num,
            is_projet: data.is_projet,
            is_note: data.is_note,
            nb_note: data.nb_note ? data.nb_note : "",
            rdv_status: data.rdv_status,
            archive: data.archibe,
            nb_planified: data.nb_planified,
            events: getEvents(data.events)
        }
        return ActiDetail;
    },
    RegisterProject: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/${codeEvent}/register?&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        // console.log("Register data =>", data);

        if (data.error) {
            return ("Already register");
        } else {
            return ("Register");
        }
    },
    UnregisterProject: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/${codeEvent}/project/destroygroup?&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        // console.log("Unregister data =>", data);

        if (data.error) {
            return ("Already register");
        } else {
            return ("Register");
        }
    }
}