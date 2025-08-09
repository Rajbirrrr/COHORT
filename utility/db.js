import { error } from "console"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db = () =>{
    mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("Database connected!!")
    })
    .catch((error) =>{
        console.log("Error connecting database!!")
    })
}

export default db
