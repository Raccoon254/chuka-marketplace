import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    function createImage(name) {
        return `https://api.dicebear.com/9.x/identicon/svg?seed=${name}`
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER',
                image: createImage(name)
            },
        })
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        console.error(error)
        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 })
        }
        return NextResponse.json({ message: 'Error creating user' }, { status: 400 })
    }
}