const express=require('express');
const router=express.Router();
const feedBack=require('../Models/FeedBackSchema')
router.post('/create',async(req,res)=>{
   try{
    const Feedback= new feedBack({
        review:req.body.review,
        experience:req.body.experience
    })
    const SaveFeedBack=await Feedback.save()
    if(SaveFeedBack)
    {
        return res.status(200).json({
            message:"FeedBack Received!"
        })
    }
    else{
        return res.json({err:"FeedBack Not Received!"})
    }
   }
   catch(err){
       console.log(err)
   }
})
router.get('/getfeedbacks',async(req,res)=>{
    try{
    const getAllFeedBacks= await feedBack.find()
    if(getAllFeedBacks)
    {
        res.send(getAllFeedBacks)
    }
    else{
        return res.json({err:"Error occured"})
    }
}
catch(err)
{
console.log(err)
}
})
module.exports=router;
