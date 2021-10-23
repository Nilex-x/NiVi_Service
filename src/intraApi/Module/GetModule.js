const fetch = require('node-fetch')

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

//         {
//         "code": "event-460527",
//         "seats": "76",
//         "title": " git #1",
//         "description": null,
//         "nb_inscrits": "28",
//         "begin": "2021-10-22 14:00:00",
//         "end": "2021-10-22 17:00:00",
//         "location": "FR\/TLS\/Marquette\/705-Bootstrap-Room",
//         "user_status": "present",
//         "assistants": [
//           {
//             "login": "nicolas1.moreel-lebon@epitech.eu",
//             "title": "Nicolas MOREEL-LEBON",
//             "picture": "nicolas1.moreel-lebon.bmp",
//             "manager_status": "eat"
//           }
//         ]
//       }

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
        const arraySalle = event.location.split('/')
        return {
            code: event.code,
            seats: event.seats,
            title: event.title,
            description: event.description,
            nb_inscrits: event.nb_inscrits,
            begin: event.begin,
            end: event.end,
            location: arraySalle[arraySalle.length - 1],
            user_status: event.user_status,
            resp: getAssit(event.assistants)
        }
    })
    return value
}

module.exports = {
    getModuleAll: async (KeyAuth, start, end) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/board?&format=json&start=${start}&end=${end}`;
        const response = await fetch(url)
        const data = await response.json()
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
            register: data.student_registered.registered == "1" ? true: false,
            events: getEvents(data.events)
        }
        return ActiDetail;
    }
}

// {
//     "module_title": "B1 - Unix & C Lab Seminar (Part I)",
//     "title": "Workshop",
//     "description": "",
//     "type_title": "Workshop",
//     "type_code": "tp",
//     "begin": "2021-10-18 00:00:00",
//     "start": "2021-10-18 00:00:00",
//     "end_register": null,
//     "deadline": null,
//     "end": "2021-10-24 00:00:00",
//     "nb_hours": "03:00:00",
//     "nb_group": 2,
//     "num": 2,
//     "register": "1",
//     "is_projet": false,
//     "is_note": false,
//     "nb_notes": null,
//     "rdv_status": "close",
//     "archive": "1",
//     "nb_planified": 2,
//     "student_registered": {
//       "registered": "1"
//     },
//     "events": [
//       {
//         "code": "event-460527",
//         "seats": "76",
//         "title": " git #1",
//         "description": null,
//         "nb_inscrits": "28",
//         "begin": "2021-10-22 14:00:00",
//         "end": "2021-10-22 17:00:00",
//         "location": "FR\/TLS\/Marquette\/705-Bootstrap-Room",
//         "user_status": "present",
//         "assistants": [
//           {
//             "login": "nicolas1.moreel-lebon@epitech.eu",
//             "title": "Nicolas MOREEL-LEBON",
//             "picture": "nicolas1.moreel-lebon.bmp",
//             "manager_status": "eat"
//           }
//         ]
//       }
//     ]
//   }