import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const userschema = new mongoose.Schema({
    "username": String,
    "email" : String,
    "password" : String

    ,verificationToken: {
        type: String,
    }
});

userschema.pre("Save", async function(next){
    if(this.isModified("Password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongoose.model("User",userschema)

export default User