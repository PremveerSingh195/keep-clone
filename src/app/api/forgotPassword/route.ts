import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ message: "Email and new Password is required" }, {
                status: 400
            })
        }

        await connectDB()

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword

        await user.save();


        return NextResponse.json(
            { message: "Password updated Succesfully" },
            { status: 200 }
        )


    } catch (error) {
          return NextResponse.json(
            {message : "Something went wrong" , error},
            {status : 500}
          )
    }
}