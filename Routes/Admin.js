const router = express.Router();
var jwt = require("jsonwebtoken");
const express = require("express");
var bcrypt = require("bcryptjs");
const Admin=require('../Models/AdminSchema')
const nodemailer = require("nodemailer");
router.post('/adminresgiter',(req,res)=>{
    const{firstname,lastname,email,password}=req.body;
    if (
        !firstname ||
        !lastname ||
        !email ||
        !password
      ) {
        return res.json({ err: "Please Enter the fields properly" });
      }
      const AdminExist = await User.findOne({ email: email });
      if (AdminExist) {
        return res.json({ err: "Admin Already exists ,Please Login" });
      }
      try {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({
              error: err,
            });
          } else {
            const admin = new Admin({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
            });
           admin.save().then((result) => {
              console.log(result);
              return res.json({
                message: "Admin Registered SuccessFully",
              });
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
})
router.post('/adminlogin',(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email) {
          return res.json({ err: "Please Enter the Email" });
        }
        if (!password) {
          return res.json({ err: "Please Enter A  Password" });
        }
        const Matchmail = await Admin.findOne({ email: email });
        if (Matchmail) {
          const isMatch = await bcrypt.compare(password, Matchmail.password);
          {
            if (isMatch) {
              const token = jwt.sign(
                {
                  email: Admin.email,
                  AdminId:Admin._id,
                },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "1h",
                }
              );
              return res.json({
                message: "Logged in Successfully",
                token: token,
              });
            } else {
              return res.json({
                err: "Auth Failed",
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
})
module.exports=router;