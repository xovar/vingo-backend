import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const genToken = async (userId) => {
    try {
        const token = await jwt.sign({userId},JWT_SECRET,{expiresIn: "7d"});
        return token
    } catch (error) {
        console.log(error);
    }
}