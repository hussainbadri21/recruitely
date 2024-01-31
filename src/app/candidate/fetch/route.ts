import prisma from '../../../../lib/prisma';


export async function GET() {

    const results = await prisma.candidate.findMany({
        where: { active: 1 },
        orderBy: {
            created_at: 'desc',
        },
    })

    return Response.json({ candidates: results })
}