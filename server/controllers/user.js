const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Student, Teacher} = require('../models/model.js')
const crypto = require('crypto')
const _ = require('lodash')
const sgMail = require('@sendgrid/mail')
const {Verify, Verified} = require('../html_template_mail/verify.js')
const {ResetPassword} = require('../html_template_mail/resetPassword.js')
const Joi = require('@hapi/joi')

sgMail.setApiKey("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")

 
//import mailgun from 'mailgun-js'
//const DOMAIN = 'sandboxa0c79ef9ce53409a84a5fd0dbc128f9d.mailgun.org';
//const mg = mailgun({apiKey: '498a4e1e72f4721aa4dcfa35e26d58a3-7dcc6512-bef2b4f6', domain: DOMAIN});
const ValidationSchema = Joi.object({
    firstname : Joi.string().min(2).required(),
    lastname : Joi.string().min(2).required(),
    email : Joi.string().min(4).required().email(),
    password : Joi.string().min(8).required(),
    phone : Joi.string().min(8).required()
})

 const signin = async (req,res) => {
 const {email, password, role} = req.body;
 try{
     switch (role){
         case "student":
            const existingStudent = await Student.findOne({email});
                if(!existingStudent) return res.status(404).json({message : "Student doesn't exist."});
            const isPassCorrect = await bcrypt.compare(password,existingStudent.password);
                if(!isPassCorrect) return res.status(400).json({message : "Invalid credentials"});
            const token = jwt.sign({ email: existingStudent.email, id:existingStudent._id},'test', {expiresIn: "1h"})
            res.status(200).json({result : existingStudent,token});
            break;
        case "teacher":
            const existingTeacher = await Teacher.findOne({email});
                if(!existingTeacher) return res.status(404).json({message : "Teacher doesn't exist."});
            const isPassTeacherCorrect = await bcrypt.compare(password,existingTeacher.password);
                if(!isPassTeacherCorrect) return res.status(400).json({message : "Invalid credentials"});
            const tokenTeacher = jwt.sign({ email: existingTeacher.email, id:existingTeacher._id},'test', {expiresIn: "1h"})
            res.status(200).json({result : existingTeacher,tokenTeacher});
            break;
     } 
}catch(error){
    res.status(500).json({message : 'Something went wrong ! '});
 }
}

 const signup = async (req,res) => {
    const {email, password , firstname, lastname,role} = req.body;
    const {errorSignUp} = ValidationSchema.validate(req.body);
    try {
        if(errorSignUp){
            return res.status(400).send(errorSignUp)
        }
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(400).json({message : "body is empty"})
          }
        
        switch(role){
            case "student":
                const existingStudent = await Student.findOne({email});
           if(existingStudent) return res.status(500).json({message : "Student Already exists."});  
          // if(password !== confirmpassword) return res.status(400).json({message : "Password don't match."});
   
           const hashedPasswordStudent = await bcrypt.hash(password, 12);
           const EmailTokenStudent = crypto.randomBytes(64).toString('hex');
           
           const resultStudent = await Student.create({
               email,
               password : hashedPasswordStudent,
               name: `${firstname} ${lastname}`,
               isVerified : false,
               emailToken : EmailTokenStudent,
           })
   
           const msgStudent = {
               from : "mostapha.ghribi20@gmail.com",
               to : email,
               subject : 'Trust Learn - Verify your email',
               text : `
               Hello thanks for your registering on our site.
               Please copy and paste the adress below to verify your account.
               http://${req.headers.host}/verify-email?token=${EmailTokenStudent}&role=student
               `,
               html:Verify(req.headers.host,EmailTokenStudent,firstname,"student")
           }
           try{
               await sgMail.send(msgStudent)
               console.log("success !! Student Created");
             /* mg.messages().send(msg, function(error,body){
                  if(error){
                      return res.json({
                          error : err.message
                      })
                  }
                  return res.json({
                      message : 'Email has been sent'
                  })
              })*/
           }catch(err){
               console.log("error msg Sign Up Student",err);
           }
   
           const tokenStudent = jwt.sign({ email: resultStudent.email, id:resultStudent._id},'test', {expiresIn: "1h"})
   
           res.status(200).json({resultStudent ,tokenStudent});
           break;
           case "teacher":
            const existingTeacher = await Teacher.findOne({email});
            if(existingTeacher) return res.status(500).json({message : "Teacher Already exists."});  
            if(password !== confirmpassword) return res.status(404).json({message : "Password don't match."});
    
            const hashedPassword = await bcrypt.hash(password, 12);
            const EmailToken = crypto.randomBytes(64).toString('hex');
            
            const result = await Teacher.create({
                email,
                password : hashedPassword,
                name: `${firstname} ${lastname}`,
                isVerified : false,
                emailToken : EmailToken,
                phone
            })
    
            const msg = {
                from : "mostapha.ghribi20@gmail.com",
                to : email,
                subject : 'Trust Learn - Verify your email',
                text : `
                Hello thanks for your registering on our site.
                Please copy and paste the adress below to verify your account.
                http://${req.headers.host}/verify-email?token=${EmailToken}&role=teacher
                `,
                html:Verify(req.headers.host,EmailToken,firstname,"teacher")
            }
            try{
                await sgMail.send(msg)
                console.log("success !! Teacher Created");
              /* mg.messages().send(msg, function(error,body){
                   if(error){
                       return res.json({
                           error : err.message
                       })
                   }
                   return res.json({
                       message : 'Email has been sent'
                   })
               })*/
            }catch(err){
                console.log("error msg Sign Up Teacher",err);
            }
    
            const token = jwt.sign({ email: result.email, id:result._id},'test', {expiresIn: "1h"})
    
            res.status(200).json({result ,token});
            break;
        }
        
    } catch (error) {
        res.status(400).json({error : 'Something went wrong ! '+error});

    }

}

 const verifyEmail = async (req,res,next)=>{
    try{
        
        switch(req.query.role){
            case "student" :
                const student = await Student.findOne({emailToken : req.query.token});
        if(!student){
            console.log("token is invalid");
            return res.status(400),json({error : "incorrected or Expired link"})
        }else{
        student.emailToken = null;
        student.isVerified = true;
      //  console.log(user);
        const msgStudent = {
            from : "mostapha.ghribi20@gmail.com",
            to : student.email,
            subject : 'Email verified successfully',
            text : `
            Hello ${student.name} Thank you for verifying your email on TrustLearn
            `,
            html: Verified(req.headers.host,student.name)
        }
        try{
            await sgMail.send(msgStudent)
            console.log("success Email Verified !!");
           /* mg.messages().send(msg, function(error,body){
                if(error){
                    return res.json({
                        error : err.message
                    })
                }
                return res.json({
                    message : 'Email has been sent'
                })
            })*/
        }catch(err){
            console.log("error msg",err);
        }
        await student.save((err,suc)=>{
            if(err){
                console.log("error !! ",err);
                return res.status(400),json({error : 'Error activating account '})
            }else{
                res.json({message : "Sign up success !!"})
            }
        });
        //! ----------------------
        //! | Error Await Unfixed |
        //! ----------------------
         res.json({message : "Email Verified Successfully !!"})
       /* await req.login(user , async (err) =>{
           if(err) return next(err); 
            console.log("succes verified");
        })*/
    }
    break;
            case "teacher" : 
    const teacher = await Teacher.findOne({emailToken : req.query.token});
    if(!teacher){
        console.log("token is invalid");
        return res.status(400),json({error : "incorrected or Expired link"})
    }else{
    teacher.emailToken = null;
    teacher.isVerified = true;
  //  console.log(user);
    const msg = {
        from : "mostapha.ghribi20@gmail.com",
        to : teacher.email,
        subject : 'Email verified successfully',
        text : `
        Hello ${teacher.name} Thank you for verifying your email on TrustLearn
        `,
        html: Verified(req.headers.host,teacher.name)
    }
    try{
        await sgMail.send(msg)
        console.log("success Email Verified !!");
       /* mg.messages().send(msg, function(error,body){
            if(error){
                return res.json({
                    error : err.message
                })
            }
            return res.json({
                message : 'Email has been sent'
            })
        })*/
    }catch(err){
        console.log("error msg",err);
    }
    await teacher.save((err,suc)=>{
        if(err){
            console.log("error !! ",err);
            return res.status(400),json({error : 'Error activating account '})
        }else{
            res.json({message : "Sign up success !!"})
        }
    });
    //! ----------------------
    //! | Error Await Unfixed |
    //! ----------------------
     res.json({message : "Email Verified Successfully !!"})
   /* await req.login(user , async (err) =>{
       if(err) return next(err); 
        console.log("succes verified");
    })*/
}

        }
        
    }catch(err){
        console.log(err);
    }
}
 const forgetPassword = (req,res) =>{
    try{

    const {email, role} = req.body;
    switch(role){
        case "student" : 
     Student.findOne({email},(err,student)=>{
        if(err || !student){
            return res.status(400).json({error : "this student does not exists"});
        }
    })

    const tokenStudent = jwt.sign({_id:Student._id},'test123', {expiresIn: "1h"})
    const msgStudent = {
        from : "mostapha.ghribi20@gmail.com",
        to : email,
        subject : 'Reset Password',
        text : `
        Hello ! Please click on given link to reset your password.
        `,
        html: ResetPassword(req.headers.host,tokenStudent,"student")
    }
    return Student.updateOne({resetLink : tokenStudent}, function (err,success){
        if(err){
            return res.status(400).json({error : "invalid reset password token"})
        }else{
            try{
            sgMail.send(msgStudent)
            console.log("success Email Sent !!");
             res.json({message : "Email Sent Successfully !! (Reset Password) for student"})
            }catch(err){
                console.log("error msg",err);
            }
        }
    })
    break;
    case "teacher" :
        Teacher.findOne({email},(err,teacher)=>{
            if(err || !teacher){
                return res.status(400).json({error : "this Teacher does not exists"});
            }
        })
    
        const token = jwt.sign({_id:Teacher._id},'test123', {expiresIn: "1h"})
        const msg = {
            from : "mostapha.ghribi20@gmail.com",
            to : email,
            subject : 'Reset Password',
            text : `
            Hello ! Please click on given link to reset your password.
            `,
            html: ResetPassword(req.headers.host,token,"teacher")
        }
        return Teacher.updateOne({resetLink : token}, function (err,success){
            if(err){
                return res.status(400).json({error : "invalid reset password token"})
            }else{
                try{
                sgMail.send(msg)
                console.log("success Email Sent !!");
                return res.json({message : "Email Sent Successfully !! (Reset Password) for teacher"})
                }catch(err){
                    console.log("error msg",err);
                }
            }
        })
        break;
}   
}catch(err){
    console.log("errorrr ",err);
}
}

 const resetPassword = (req,res) =>{
    const {resetLink, newPassword,role} = req.body;
    if(resetLink){
        jwt.verify(resetLink,"test123",function(error,decodedData){
            if(error){
                return res.status(401).json({
                    error : "Incorrect token or it is expired"
                })
            }
            switch(role){
                case "student" :
                    Student.findOne({resetLink},async (err,student)=>{
                        if(err || !student){
                            return res.status(401).json({
                                error : "Student with this token does not exits"
                            })
                        }
                        const hashedPasswordStudent = await bcrypt.hash(newPassword, 12);
                        const obj = {
                            password : hashedPasswordStudent
                        }
                        student = _.extend(student, obj);
                        student.save((err,result) => {
                            if(err){
                                return res.status(401).json({
                                    error : "something wrong"
                                })
                            }else{
                                return res.status(200).json({
                                    message : "your password has been changed (student)"
                                })
                            }
                        })
                    })
                    break;
                    case "teacher" :
                        Teacher.findOne({resetLink},async (err,teacher)=>{
                            if(err || !teacher){
                                return res.status(401).json({
                                    error : "Teacher with this token does not exits"
                                })
                            }
                            const hashedPassword = await bcrypt.hash(newPassword, 12);
                            const obj = {
                                password : hashedPassword
                            }
                            teacher = _.extend(teacher, obj);
                            teacher.save((err,result) => {
                                if(err){
                                    return res.status(401).json({
                                        error : "something wrong"
                                    })
                                }else{
                                    return res.status(200).json({
                                        message : "your password has been changed (Teacher)"
                                    })
                                }
                            })
                        })
                        break;
            }
            
        })
    }else{
        return res.status(401).json({
            error : "Auth error !!"
        })
    }
}

const getAllStudents = async(req,res) =>{
    try{
        const AllStudents = await Student.find();
        if(!AllStudents.length){
            return res.status(200).json({message : "there is no students here"})
        }
        return res.status(200).json(AllStudents);
    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}

const getAllTeachers = async(req,res) =>{
    try{
        const AllTeachers = await Teacher.find();
        if(!AllTeachers.length){
            return res.status(200).json({message : "there is no teachers here"})
        }
        return res.status(200).json(AllTeachers);
    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}

const getStudentByEmail = async(req,res) => {
    const {email} = req.body;
    try{
        const student = await Student.findOne({email : email});
            if(!student) return res.status(200).json({message : "there is no student by this email : "+email })
            return res.status(200).json(student)
    }catch(error){
        return res.status(400).json({error : "something wrong error : "+error})
    }
}
module.exports = {signin , signup , verifyEmail , resetPassword ,getStudentByEmail, forgetPassword, getAllStudents, getAllTeachers}