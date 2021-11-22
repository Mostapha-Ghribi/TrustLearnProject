import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name : {type : String, required : true},
    email:{type : String, required : true},
    emailToken : String,
    password:{type : String, required : true},
    isVerified : Boolean,
    phone:{type : String, required : true},
  //  role:{type : String, required : true},
    id:{type : String }
})

export default mongoose.model('User',userSchema,'Auth');