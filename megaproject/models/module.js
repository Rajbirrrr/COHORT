import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    "username": String,
    "email" : String,
    "password" : String


})

const user = mongoose.model("user",userschema)

export default user