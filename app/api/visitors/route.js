import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
    try {
        const visitors = await prisma.visitors.findMany();
        return new Response(JSON.stringify(visitors), {status: 200});
    }catch (e) {
        console.error(e);
        return new Response('Error fetching visitors: ' + e.message, {status: 400});
    }
}

export async function POST(req) {
    try {
        const {ip, location, userAgent} = await req.json();

        if (!ip || !location || !userAgent) {
            console.error('IP, location and userAgent are required');
            return new Response('IP, location and userAgent are required', {status: 400});
        }

        const visitor = await prisma.visitors.create({
            data: {
                ip,
                location,
                userAgent
            },
        });

        return new Response(JSON.stringify(visitor), {status: 201});
    } catch (e) {
        console.error(e);
        return new Response('Error creating visitor: ' + e.message, {status: 400});
    }
}