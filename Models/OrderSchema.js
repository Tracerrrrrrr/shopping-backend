const mongoose=require('mongoose')
const orderSchema= mongoose.Schema({
    firstname:{
        required:true,
        type:String,
    },
    lastname:{
        required:true,
        type:String,
    },
    contactnumber:{
        required:true,
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,   
    },
    sizes:{
       type:String,
       required:true,
       default:'28',
       enum:['28','30','32','34','36','38','xl','xxl','m','l','s']
    },
    material:{
        type:String,
        required:true,
    },
    productImage:
    {
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    payment:{
        type: String, 
        default:'cash',
        enum : ['cash','Google Pay'],
    },
    address:{
        type:String,
        required:true,
    }
},{timestamps:true})
const order=mongoose.model('ORDER',orderSchema)
module.exports=order