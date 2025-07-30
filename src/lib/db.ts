import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error ("Please define mongodb uri")
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend NodeJS global type
declare global {
  // This is necessary for hot-reloading in development
  var mongoose: MongooseCache | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
}; 

const cached = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;


export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI , {dbName : "nextjs_app"})
    }

    cached.conn = await cached.promise;
    return cached.conn;
}