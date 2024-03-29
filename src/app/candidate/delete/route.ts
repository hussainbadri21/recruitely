import prisma from '../../../../lib/prisma';


export async function DELETE(req: Request) {
    try {
        const data = await req.json();
        const result = await prisma.candidate.delete({ where: { candidate_id: data.id } })
        if (result)
            return Response.json({ message: 'Candidate details deleted successfully' }, { status: 200 })
    } catch (e) {
        console.log(e)
        return Response.json({ message: 'Failed to delete Candidate details' }, { status: 400 })
    }
    return Response.json({ message: 'Failed to delete Candidate details' }, { status: 400 })
}