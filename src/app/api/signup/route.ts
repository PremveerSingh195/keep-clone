import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body


        if (!username || !email || !password) {
            return NextResponse.json({ message: "Missing Fiels" }, { status: 404 })
        }

        await connectDB()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ error: "Email already used" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword
        })

        return NextResponse.json({ message: "User created succesfully" }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: "Signup failed" }, { status: 500 })
    }
}