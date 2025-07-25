import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model("User", UserSchema);    