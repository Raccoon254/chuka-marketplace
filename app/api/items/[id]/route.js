import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
    const { id } = params
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                seller: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })
        if (!item) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 })
        }
        return NextResponse.json(item)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error fetching item' }, { status: 500 })
    }
}