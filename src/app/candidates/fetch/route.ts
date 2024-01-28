import prisma from '../../../../lib/prisma';


export async function GET() {

    const results = await prisma.candidate.findMany({ where: { s: 1 } })

    return Response.json({ candidates: results })
}