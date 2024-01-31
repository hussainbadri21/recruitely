import prisma from '../../../../../lib/prisma';
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    const results = await prisma.candidate.findUnique({ where: { candidate_id: Number(id), active: 1 } })
    return Response.json({ candidate: results })
}