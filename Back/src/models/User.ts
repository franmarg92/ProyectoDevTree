import mongoose, { Schema } from "mongoose";

interface IUser{
    name: string,
    handle: string,
    email: string,
    password: string
}

const userSchema = new Schema({
    name: {
        type : String,
        require : true,
        trim: true
    },
     handle: {
        type : String,
        require : true,
        trim: true,
        lowercase :true,
        unique: true
    },
    email: {
        type : String,
        require : true,
        trim: true,
        unique: true,
        lowercase :true
    },
    password: {
        type : String,
        require : true,
        trim: true
    },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User