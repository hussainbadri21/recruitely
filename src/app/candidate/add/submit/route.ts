import prisma from '../../../../../lib/prisma';
import { getScore, validateForm } from '@/app/helpers'

export async function POST(req: Request) {
    try {
        const data = await req.json();
        data.expected_salary = parseFloat(data.expected_salary)
        data.current_status = parseInt(data.current_status)
        data.phone = `${data.prefix} ${data.phone}`
        data.active = 1

        delete data.prefix

        if (validateForm(data)) {
            data.score = getScore(data.skills.react) + getScore(data.skills.node)
            const results = await prisma.candidate.create({ data })
            if (results)
                return Response.json({ message: 'Candidate details added successfully' }, { status: 200 })
        }
    } catch (e) {
        console.log(e)
    }

    return Response.json({ message: 'ok' })
}