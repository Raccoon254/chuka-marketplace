import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const items = await prisma.item.findMany({
            include: {
                seller: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })
        return NextResponse.json(items)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error fetching items' }, { status: 500 })
    }
}

export async function POST(req) {
    const { title, description, price, location, contact, sellerId, images } = await req.json()
    try {
        const item = await prisma.item.create({
            data: {
                title,
                description,
                price,
                location,
                contact,
                sellerId,
                images,
            },
        })
        return NextResponse.json(item, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error creating item' }, { status: 400 })
    }
}
