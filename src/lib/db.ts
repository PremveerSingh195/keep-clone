import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error ("Please define mongodb uri")
}

let cached = (global as any).mongoose || {conn : null , promise : null}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI , {dbName : "nextjs_app"})
    }

    cached.conn = await cached.promise;
    return cached.conn;
}