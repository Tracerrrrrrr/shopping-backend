const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
  firstname:{
      type:String,
      required:true
  },
  lastname:{
      type:String,
      required:true
  },
  gender:{
      type:String,
      enum : ['MALE','FEMALE']
  },
  email:{
      type:String,
      required:true
  },
  contactnumber:{
      type:Number,
      required:true
  },
  password:{
      type:String,
      required:true
  },   
})
const user=mongoose.model('USER',userSchema)
module.exports=user;