import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
    try {
        const categories = await prisma.category.findMany();
        return new Response(JSON.stringify(categories), {status: 200});
    }catch (e) {
        console.error(e);
        return new Response('Error fetching categories: ' + e.message, {status: 400});
    }
}

export async function POST(req) {
    try {
        const {name} = await req.json();

        if (!name) {
            console.error('Name is required');
            return new Response('Name is required', {status: 400});
        }

        const category = await prisma.category.create({
            data: {
                name
            },
        });

        return new Response(JSON.stringify(category), {status: 201});
    } catch (e) {
        console.error(e);
        return new Response('Error creating category: ' + e.message, {status: 400});
    }
}