import prisma from '../../../../../lib/prisma';

const getScore = (experience: number) => {
    if (experience < 1) {
        return 1
    }
    else if (experience <= 2) {
        return 2
    }
    return 3
}


export async function POST(req: Request) {
    try {
        const data = await req.json();
        data.expected_salary = parseFloat(data.expected_salary)
        data.current_status = parseInt(data.current_status)
        data.phone = `+${data.prefix} ${data.phone}`
        data.active = 1

        delete data.prefix

        if (data.candidate_name == null || data.candidate_name == "") {
            return Response.json({ message: "Please enter candidate's name" }, { status: 400 })
        }
        if (data.email == null || data.email == "") {
            return Response.json({ message: "Please enter candidate's email" }, { status: 400 })
        }
        if (data.phone == null || data.phone == "" || data.phone.includes('undefined')) {
            return Response.json({ message: "Please enter candidate's phone number" }, { status: 400 })
        }
        if (data.skills.react == null || data.skills.react == "") {
            data.skills.react = 0
        }
        if (data.skills.node == null || data.skills.node == "") {
            data.skills.node = 0
        }
        if (data.expected_salary == null || isNaN(data.expected_salary)) {
            return Response.json({ message: "Please enter candidate's expected salary" }, { status: 400 })
        }
        if (data.current_status == null || isNaN(data.current_status) || data.current_status < 0 || data.current_status > 4) {
            return Response.json({ message: "Please select correct value for candidate's status" }, { status: 400 })
        }

        data.score = getScore(data.skills.react) + getScore(data.skills.node)

        const results = await prisma.candidate.create({ data })
        if (results)
            return Response.json({ message: 'Candidate details added successfully' }, { status: 200 })
    } catch (e) {
        console.log(e)
    }

    return Response.json({ message: 'ok' })
}