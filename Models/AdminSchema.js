const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const adminSchema=new mongoose.Schema({
  firstname:{
      type:String,
      required:true
  },
  lastname:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },   
})
const admin=mongoose.model('USER',adminSchema)
module.exports=admin;