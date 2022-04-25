const mongoose=require('mongoose')
const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        
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
    stock:
    {
    type: String, 
    default:'Available',
    enum : ['Available','Out Of Stock'], 
    },
    delivery:{
        type:String,
        required:true
    }
},{timestamps:true})
const Product=mongoose.model('PRODUCT',ProductSchema)
module.exports=Product