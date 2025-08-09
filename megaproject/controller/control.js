import User from "../models/module.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registeruser = async(req,res) =>{
    const {username,email,password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({
            message: "All fields are required!"
        });
 }

 console.log(email);

 try{
    const existinguser = await User.findOne({email})
    if (existinguser){
        return res.status(400).json({
            message : "user already exists!!"
        })
    }

    const user= User.create({
        name,
        email,
        password
    })

    if(!user){
        return res.status(400).json({
            message : "User not registered"
        });
    }

    const token = crypto.randomBytes(32).toString("hex")
    console.log(token);
    (await user).verificationToken = token

    (await user).save;

    const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.mailtrap_host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "process.env.mailtrap_username",
    pass: "process.env.mailtrap_password",
  },
});

     const mailoption= {
    from: process.env.mailtrap_username,
    to: User.email,
    subject: "Hello ✔",
    text: `Please click on the link:-
    ${process.env.Base_url}/${token}
    `,
  };

  await transporter.sendMail(mailoption)

  res.status(200).json({
    message: "succesfully registered",
    success: true
  })
  
 }catch (error){
    res.status(400)({
        message: "User not registered",
        success: false
    })
 }
};

const verifyuser = async (req,res) =>{
    const {token} = req.params;
    console.log(token);

    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    const user = await User.findOne({verificationToken: token})

    if(!user){
        return res.status(400).json({
            message: "No user"
        })
    }

    user.isVerified = true;
    user.verificationToken= undefined;

    await user.save()
}

const login = async (req,res)=>{
    const {email,password}= req.body;
    if(!email || password){
        return res.status(400).json({
            message: "User still not registered"
        })
    }
    try{
        const user = await User.findOne({email});
         if(!user){
        return res.status(400).json({
            message: "User still not registered"
        })
    }

    const usermatch = bcrypt.compare(password, user.password)
         if(!usermatch){
        return res.status(400).json({
            message: "User still not registered"
        })
    }

    const token = jwt.sign(
        {id: user_id},

        "shhhh", {
            expiresIn: '24h'
        }
    )
    const cookieoptions= {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000
    }
    res.cookie("test" , token , cookieoptions)

    res.status(200).json({
        message: "user made"
    })
    }catch(error){}
}



export {registeruser, verifyuser, login};
