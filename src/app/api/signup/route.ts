import { NextResponse ,  NextRequest } from "next/server";


export async function POST( req: NextRequest) {
    try {
        const body = await req.json();
        const {username , email , password} = body


        if (!username || !email || !password) {
            return NextResponse.json({message : "Missing Fiels"} , {status : 404})
        }
    } catch (error) {
        return NextResponse.json({message : error} , {status:400})
    }
}