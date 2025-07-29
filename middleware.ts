import { NextRequest , NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

const protectedRoutes = ['/dashboard']

export async function middleware(req:NextRequest) {
    const token = req.cookies.get('token')?.value

    const isProtected = protectedRoutes.some((route)=>
    req.nextUrl.pathname.startsWith(route)
    );

    if (isProtected) {
        if (!token) return NextResponse.redirect(new URL('/login' , req.url))

            try {
                verifyJWT(token)
            } catch (error) {
                return NextResponse.redirect(new URL('/login' , req.url))
            }
    }

    return NextResponse.next()
}   

export const config = {
    matcher : ['/dashboard/:path*']
}


