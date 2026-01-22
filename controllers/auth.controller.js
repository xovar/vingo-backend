import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { genToken } from "../util/token.js";

export const signUp = async (req,res,next) => {
    try {
        const {fullname, email, password, role} = req.body;

        const isExists = await User.findOne({email});
    
        if(isExists){
            const error = new Error('Email Address Is Already In Use');
            error.statusCode = 409;
            throw error
        }

        const hashedPassword = bcrypt.hash(password,10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        })

        const token = await genToken(newUser._id);

        res.cookie("token",token,{
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
              token: token,
              user: {
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
              },
            },
          });


    } catch (error) {
        next(error)
    }
}