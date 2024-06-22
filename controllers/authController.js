import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//register function
export const register = async(req,res,next) =>{
    const user = await User.findOne({email:req.body.email});
    if(user) return next(createError(404, "User already exists"));
    

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save();
        res.status(200).send("User has been created.");
    }catch(err){
        next(err);
    }
}


//login function

export const login = async(req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password 
        );


        if(!isPasswordCorrect)
         return next(createError(400, "Wrong password or username"));

        // jsonwebtoken was used
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1d' });

        //setting this token into our cookies. first install cookie parser

        const {_id,...otherDetails} = user._doc;
        res.status(200).json(({ _id, token }))
    }catch(err){
        console.log(err)
        next(err);
    }
}


//logout function
export const logout = async(req,res,next) =>{
    try{
        res
          .clearCookie("access_token")
          .status(200)
          .json({data: "Cookie Deleted"});
    }catch(err){
        console.log(err)
        next(err);
    }
}