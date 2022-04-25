const express = require('express')
const app = express()
const port = 8000
const cors=require('cors')
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose')
app.use(express.json())
app.use('/public', express.static('public'));
app.use(express.urlencoded({
  extended:true,
}))
const Db='mongodb+srv://Shivam:0XybYaY4YsmjvMaL@cluster0.oysfx.mongodb.net/test';
mongoose.connect(Db).then(()=>{
  console.log("Connected to database successfully")
}).catch(err=>{
  console.log(err)
})
const product=require('./Routes/ProductList')
const user=require('./Routes/User')
app.use('/user',user)
app.use('/product',product)
/*app.use((req,res,next)=>{
  const error=new Error("Not Found!")
  error.status=404;
  next(error)
})
app.use((error,req,res,next)=>{
  res.status(error.status||500)
  res.json
  ({
    error:{
      message:error.message
    }
  })
}) */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})