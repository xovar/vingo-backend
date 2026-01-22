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

        const hashedPassword = await bcrypt.hash(password,10);

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

export const signIn = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        const isExists = await User.findOne({email});
    
        if(!isExists){
            const error = new Error('Email Address Is Not In Use');
            error.statusCode = 404;
            throw error
        }

        const isCorrect = await bcrypt.compare(password,isExists.password);

        if(!isCorrect){
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error
        }

        const token = await genToken(isExists._id);

        res.cookie("token",token,{
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        res.status(201).json({
            success: true,
            message: "Logged In",
            data: {
              token: token,
              user: {
                fullname: isExists.fullname,
                email: isExists.email,
                role: isExists.role
              },
            },
          });


    } catch (error) {
        next(error)
    }
}

export const signOut = async (req,res,next) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully",
        });
    } catch (error) {
        next(error)
    }
}