const mongoose=require('mongoose')
const FeedBackSchema=new mongoose.Schema({
    review:{
        type:String,
    },
    experience:{
        type:String
    }
})
const FeedBack=mongoose.model('FEEDBACK',FeedBackSchema)
module.exports=FeedBack;