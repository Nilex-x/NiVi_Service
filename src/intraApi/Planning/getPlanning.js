const fetch = require('node-fetch')

const getRoom = (room, planning) => {
    let salle = ""
    let nb_seat = 0
    if (room && room.code) {
        const arraySalle = room.code.split('/')
        salle = arraySalle[arraySalle.length - 1]
    }
    if (room && room.seats) {
        nb_seat = room.seats
    }
    return {
        salle,
        nb_seat
    }
}

module.exports = {
    getPlanning: async (KeyAuth, start, end) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/planning/load?&format=json`;
        const response = await fetch(url)
        const data = await response.json()
        if (data.length > 0) {
            const value = data.map(planning => {
                return {
                    scolaryear: planning.scolaryear,
                    codemodule: planning.codemodule,
                    codeinstance: planning.codeinstance,
                    codeacti: planning.codeacti,
                    codeevent: planning.codeevent,
                    semester: planning.semester,
                    titlemodule: planning.titlemodule,
                    acti_title: planning.acti_title,
                    start: planning.start,
                    end: planning.end,
                    total_students_registered: planning.total_students_registered,
                    title: planning.title,
                    type_title: planning.type_title,
                    type_code: planning.type_code,
                    is_rdv: planning.is_rdv,
                    nb_hours: planning.nb_hours,
                    allowed_planning_start: planning.allowed_planning_start,
                    allowed_planning_end: planning.allowed_planning_end,
                    nb_group: planning.nb_group,
                    nb_max_students_projet: planning.nb_max_students_projet,
                    ...getRoom(planning.room, planning),
                    module_available: planning.module_available,
                    module_registered: planning.module_registered,
                    past: planning.past,
                    allow_register: planning.allow_register,
                    event_registered: planning.event_registered === false ? false : true,
                    project: planning.project,
                }
            })
            return value
        } else {
            return []
        }
        return 1;
    },
    getDayEvents: async (KeyAuth, start, end) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/planning/load?&format=json&start=${start}&end=${end}`;
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        if (data.length > 0) {
            const value = data.map(planning => {
                return {
                    scolaryear: planning.scolaryear,
                    codemodule: planning.codemodule,
                    codeinstance: planning.codeinstance,
                    codeacti: planning.codeacti,
                    codeevent: planning.codeevent,
                    semester: planning.semester,
                    titlemodule: planning.titlemodule,
                    acti_title: planning.acti_title,
                    start: planning.start,
                    end: planning.end,
                    total_students_registered: planning.total_students_registered,
                    title: planning.title,
                    type_title: planning.type_title,
                    type_code: planning.type_code,
                    is_rdv: planning.is_rdv,
                    nb_hours: planning.nb_hours,
                    allowed_planning_start: planning.allowed_planning_start,
                    allowed_planning_end: planning.allowed_planning_end,
                    nb_group: planning.nb_group,
                    nb_max_students_projet: planning.nb_max_students_projet,
                    ...getRoom(planning.room, planning),
                    module_available: planning.module_available,
                    module_registered: planning.module_registered,
                    past: planning.past,
                    allow_register: planning.allow_register,
                    event_registered: planning.event_registered === false ? false : true,
                    project: planning.project,
                }
            })
            return value
        } else {
            return []
        }
    },
    getMyPlannig: (KeyAuth) => {
        const url = `${process.env.API_INTRA}${KeyAuth}/planing/my-schedules`; // not good path
    },
    RegisterActi: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/${codeEvent}/register?&format=json`;
        const response = await fetch(url, { method: 'post', headers: {'Content-Type': 'application/json'} });
        const data = await response.json();

        console.log("response =>", data);


        if (data.error) {
            return ("Already register");
        } else {
            return ("Register");
        }
    },
    UnregisterActi: async (KeyAuth, scolaryear, codemodule, codeinstance, codeActi, codeEvent) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/module/${scolaryear}/${codemodule}/${codeinstance}/${codeActi}/${codeEvent}/unregister?&format=json`;
        console.log(url);
        const response = await fetch(url, { method: 'post', headers: {'Content-Type': 'application/json'} });
        const data = await response.json();

        console.log("response =>", data);

        if (data.error) {
            return ("Already unregister");
        } else {
            return ("Unregister");
        }
    }
}