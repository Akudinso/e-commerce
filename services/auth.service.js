import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { generateAuthToken } from "../utils/generateToken.js";

export default class AuthService{
    async registerUser(userData) {
        console.log("userData", userData);
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exist with this email")
        }



        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new User({
            ...userData,
            password: hashedPassword,
        });

        await newUser.save();
        return newUser;
    }

    async loginUser(email,password){
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("invalid credential")
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            throw new Error("invalid Credentials")
        }


        const token = await generateAuthToken(user);
        return {user,token}
    }
}

