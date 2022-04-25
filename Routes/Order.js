const express=require('express');
const router=express.Router();
const multer=require('multer');
const DIR = './public/';
const {v4:uuidv4}=require('uuid')
const Order=require('../Models/OrderSchema')

const storage=multer.diskStorage({
    destination:function(req,file,cb )
    {
    cb(null,DIR)
    },
    filename:function(req,file,cb)
    {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
    }
  });  
  var upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
          if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              cb(null, true);
          } else {
              cb(null, false);
              return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
      }
  });
  router.post('/buy',(req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    if(!firstname||!lastname||!contactnumber||!name||!price||!sizes||!material||!details||!quantity||productImage||!payment||!address)
    {
        return res.json({message:"All Fields Are required"})
    }
    else{
    const Orders=new Order({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactnumber: req.body.contactnumber,
        name:req.body.name,
        price:req.body.price,
        sizes:req.body.sizes,
        material:req.body.material,
        details:req.body.details,
        quantity:req.body.quantity,
        productImage: url + '/public/' + req.file.filename,
        payment:req.body.payment,
        address:req.body.address
    })
    Orders.save().then(result=>{
        return res.status(200).json({message:"Created!",OrderCreated: {
            _id: result._id,
            name:result.name,
            sizes:result.sizes,
            material:req.body.material,
            details:result.details,
            quantity:result.quantity,
            productImage:result.productImage,
            stock:result.stock,
            payment:result.payment,
            delivery:result.delivery,
            timestamps
        }})
    }).catch(err=>{
        console.log(err)
    })
}
  })
  router.post('/cancelorder/:id',async(req,res)=>{
   const CancelOrder=await Order.create(req.params.id)
   if(CancelOrder)
   {
       return res.json({
           message:"Order Cancelled"
       })
   }
   else{
       return res.json({
           err:err
       })
   }
  })
  router.post('/deleteorder/:id',async(req,res)=>{
      const deleteorder= await Order.findByIdAndDelete(req.params.id)
      if(deleteorder)
      {
          return res.json({
              message:"Deleted Order SuccessFully"
          })
      }
      else{
          return res.json({
              err:err 
          })
      }
  })
  module.exports=router;