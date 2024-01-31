import prisma from '../../../../../lib/prisma';


export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const id = Number(data.id)
        const current_status = parseInt(data.current_status)

        const results = await prisma.candidate.update({
            where: {
                candidate_id: id
            },
            data: {
                current_status: current_status
            }
        });

        if (results)
            return Response.json({ message: 'Candidate status updated successfully', updated_data: results }, { status: 200 })

    } catch (e) {
        console.log(e)
        return Response.json({ message: "Failed to update candidate's current status" }, { status: 400 })
    }
    return Response.json({ message: "Failed to update candidate's current status" }, { status: 400 });
}
