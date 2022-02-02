const fetch = require('node-fetch')

const getProject = (projects) => {
    const newProject = projects.map(project => {
        const linkClear = project.title_link.replace("\\/", ' ')
        const startProjet = project.timeline_start.replace('\\', '')
        const arrayStart = startProjet.split(',')
        const arrayStartTime = arrayStart[1].split('h')
        const arrayStartDate = arrayStart[0].split('/')
        const endProjet = project.timeline_end.replace('\\', '')
        const arrayEnd = endProjet.split(',')
        const arrayEndTime = arrayEnd[1].split('h')
        const arrayEndDate = arrayEnd[0].split('/')
        const StartProject = `${arrayStartDate[2]}-${arrayStartDate[1]}-${arrayStartDate[0]}T${arrayStartTime[0].trim()}:${arrayStartTime[1]}`
        const EndProject = `${arrayEndDate[2]}-${arrayEndDate[1]}-${arrayEndDate[0]}T${arrayEndTime[0].trim()}:${arrayEndTime[1]}`
        const arrayOfInfo = linkClear.split('/')
        return {
            title: project.title,
            code_acti: arrayOfInfo[5],
            code_module: arrayOfInfo[3],
            scolaryear: arrayOfInfo[2],
            codeinstance: arrayOfInfo[4],
            timeline_start: StartProject,
            timeline_end: EndProject,
            timeline_barre: parseFloat(project.timeline_barre)
        }
    })
    return newProject
}

const getNotes = (notes) => {
    const newNotes = notes.map(note => {
        const linkClear = note.title_link.replace("\\/", ' ')
        const arrayOfInfo = linkClear.split('/')
        return {
            title: note.title,
            code_acti: arrayOfInfo[5],
            code_module: arrayOfInfo[3],
            scolaryear: arrayOfInfo[2],
            codeinstance: arrayOfInfo[4],
            note: note.note,
            noteur: note.noteur
        }
    })
    return newNotes
}

const getActivites = (activites) => {
    const newActivites = activites.map(activite => {
        const linkClear = activite.title_link.replace("\\/", ' ')
        const startProjet = activite.timeline_start.replace('\\', '')
        const arrayStart = startProjet.split(',')
        const arrayStartTime = arrayStart[1].split('h')
        const arrayStartDate = arrayStart[0].split('/')
        const endProjet = activite.timeline_end.replace('\\', '')
        const linkRegister = activite.register_link.replace('\\', '')
        const arrayOfInfo = linkClear.split('/')
        const arrayEnd = endProjet.split(',')
        const arrayEndTime = arrayEnd[1].split('h')
        const arrayEndDate = arrayEnd[0].split('/')
        const StartProject = `${arrayStartDate[2]}-${arrayStartDate[1]}-${arrayStartDate[0]}T${arrayStartTime[0].trim()}:${arrayStartTime[1]}`
        const EndProject = `${arrayEndDate[2]}-${arrayEndDate[1]}-${arrayEndDate[0]}T${arrayEndTime[0].trim()}:${arrayEndTime[1]}`
        return {
            title: activite.title,
            module: activite.module,
            code_acti: arrayOfInfo[5],
            code_module: arrayOfInfo[3],
            scolaryear: arrayOfInfo[2],
            codeinstance: arrayOfInfo[4],
            timeline_start: StartProject,
            timeline_end: EndProject,
            timeline_barre: parseFloat(activite.timeline_barre),
            salle: activite.salle,
            registerLink: linkRegister
        }
    })
    return newActivites
}

const getHistory = (historys) => {
    const newHistory = historys.map(history => {
        return {
            title: history.title,
            user: {
                picture: "", // got: \/file\/userprofil\/nicolas1.moreel-lebon.bmp expected: /file/userprofil/commentview/nicolas1.moreel-lebon.jpg
                title: history.user.title
            },
            content: history.content,
            date: history.date
        }
    })
    return newHistory
}

module.exports = {
    getBoard: async (KeyAuth) => {
        const url = `${process.env.API_INTRA}/${KeyAuth}/?&format=json`;
        const response = await fetch(url, { 'headers': { 'cookie': `language=fr` }})
        const data = await response.json()
        if (data.message || data.error) {
            return {
                projets: [],
                notes: [],
                activites: [],
                historys: []
            };
        }
        return {
            projets: getProject(data.board.projets),
            notes: getNotes(data.board.notes),
            activites: getActivites(data.board.activites),
            historys: getHistory(data.history)
        };
    }
}