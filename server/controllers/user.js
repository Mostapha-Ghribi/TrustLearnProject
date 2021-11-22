import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import crypto from 'crypto'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

export const signin = async (req,res) => {
 const {email, password} = req.body;
 try{
    const existingUser = await User.findOne({email});
    if(!existingUser) return res.status(404).json({message : "User doesn't exist."});
    const isPassCorrect = await bcrypt.compare(password,existingUser.password);
    if(!isPassCorrect) return res.status(400).json({message : "Invalid credentials"});
    const token = jwt.sign({ email: existingUser.email, id:existingUser._id},'test', {expiresIn: "1h"})
    res.status(200).json({result : existingUser,token});
}catch(error){
    res.status(500).json({message : 'Something went wrong ! '});
 }
}

export const signup = async (req,res) => {
    const {email, password , firstname, lastname, confirmpassword, phone} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(500).json({message : "User Already exists."});  
        if(password !== confirmpassword) return res.status(404).json({message : "Password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);
        const EmailToken = crypto.randomBytes(64).toString('hex');
        
        const result = await User.create({
            email,
            password : hashedPassword,
            name: `${firstname} ${lastname}`,
            isVerified : false,
            emailToken : EmailToken,
            phone
        })

        const msg = {
            from : email,
            to : email,
            subject : 'Trust Learn - Verify your email',
            text : `
            Hello thanks for your registering on our site.
            Please copy and paste the adresse below to verigy your account.
            http://${req.headers.host}/verify-email?token=${EmailToken}
            `,
            html:`
            <h1>Hello</h1>
            <p>Thanks for registering on our site.</p>
            <p>Please click the link below to verify your account.</p>
            <a href="http://${req.headers.host}/verify-email?token=${EmailToken}">Verify your account</a>`
        }
        try{
            await sgMail.send(msg)
            console.log("success");
        }catch(err){
            console.log("error msg",err);
        }

        const token = jwt.sign({ email: result.email, id:result._id},'test', {expiresIn: "1h"})

        res.status(200).json({result ,token});

    } catch (error) {
        res.status(500).json({message : 'Something went wrong ! '});

    }

}
export const verify = async (req,res,next)=>{
    try{
        const user = await User.findOne({emailToken : req.query.token});
        if(!user){
            console.log("token is invalid");
        }else{
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        await req.login(user , async (err) =>{
            if(err) return next(err);
            console.log("succes verified");
        })
    }
    }catch(err){
        console.log(err);
    }
}