import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error creating user' }, { status: 400 })
    }
}