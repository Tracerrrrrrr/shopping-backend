const express=require('express');
const router=express.Router();
const multer=require('multer');
const DIR = './public/';
const {v4:uuidv4}=require('uuid')
const product=require('../Models/ProductSchema')
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
router.post('/create',upload.single('productImage'),async(req,res)=>{
       try{
        const url = req.protocol + '://' + req.get('host')
        const Products= new product({
            name:req.body.name,
            price:req.body.price,
            sizes:req.body.sizes,
            material:req.body.material,
            details:req.body.details,
            productImage: url + '/public/' + req.file.filename,
            stock:req.body.stock,
            delivery:req.body.delivery
        })  
  Products.save().then(result=>{
            return res.status(200).json({message:"Created!",ProductCreated: {
                _id: result._id,
                name:result.name,
                sizes:result.sizes,
                material:req.body.material,
                details:result.details,
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
       catch(err){
           console.log(err)
       }
})
router.get('/getallproducts',async(req,res)=>{
    try{
  const getproduct=await product.find();
  if(getproduct)
  {
      return res.json(getproduct)
  }
}
catch(err)
{
    console.log(err)
}
})
router.delete('/delete/:id',async(req,res)=>{
    const productId= req.params.id;
    try{
    const deleteproduct= await product.findByIdAndDelete(productId)
    if(deleteproduct)
    {
        return res.status(200).json({message:"Deleted"})
    }
    else{
        return res.json({err:"Not deleted"})
    }
}
catch(err){
   console.log(err)
}
})

module.exports=router;