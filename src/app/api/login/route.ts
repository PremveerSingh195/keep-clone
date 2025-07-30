import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { createJWT } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
        }

        await connectDB()
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 404 })
        }

        const token  = createJWT({email , password})

        ;(await cookies()).set('token' , token , {
            httpOnly : true,
            path : "/"
        })

        return NextResponse.json({
            message: "Login Succesful",
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        return NextResponse.json({ message: `${err} Internal server error` }, { status: 500 } , )
    }
}
