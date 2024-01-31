import prisma from '../../../../../lib/prisma';
import { getScore, validateForm, statusList } from '@/app/helpers'

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const id = Number(data.id)
        data.expected_salary = parseFloat(data.expected_salary)
        data.current_status = isNaN(parseInt(data.current_status))
            ? statusList.indexOf(data.current_status) : parseInt(data.current_status)
        data.phone = `${data.prefix} ${data.phone}`
        data.active = 1

        delete data.prefix
        delete data.id

        if (validateForm(data)) {
            data.score = getScore(data.skills.react) + getScore(data.skills.node)
            const results = await prisma.candidate.update({
                where: {
                    candidate_id: id
                },
                data: data
            });

            if (results)
                return Response.json({ message: 'Candidate details updated successfully', updated_data: results }, { status: 200 })
        }
    } catch (e) {
        console.log(e)
    }

    return Response.json({ message: 'ok' })
}