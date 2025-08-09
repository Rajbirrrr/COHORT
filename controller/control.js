import user from "../models/module.js";

const registeruser = async(req,res) =>{
    const {username,email,password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({
            message: "All fields are required!"
        });
 }

 console.log(email);
}



export {registeruser};
