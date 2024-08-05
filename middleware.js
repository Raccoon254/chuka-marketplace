import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
    const token = await getToken({ req, secret });

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const role = token.role

    const path = req.nextUrl.pathname;

    if (path.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/manager/:path*', '/client/:path*'],
};
