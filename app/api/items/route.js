import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const items = await prisma.item.findMany()
        return NextResponse.json(items)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error fetching items' }, { status: 500 })
    }
}

export async function POST(req) {
    const { title, description, price, location, contact, sellerId, categoryId, images } = await req.json();
    try {
        // Validate categoryId (if necessary, depending on your application logic)
        if (!categoryId) {
            throw new Error('Category ID is required');
        }

        const item = await prisma.item.create({
            data: {
                title,
                description,
                verified: false,
                price,
                location,
                contact,
                images,
                sellerId: parseInt(sellerId),
                categoryId: parseInt(categoryId),
                status: 'AVAILABLE',
            },
        });
        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message || 'Error creating item' }, { status: 400 });
    }
}
