const express = require("express");
const User = require("../Models/userSchema");
const router = express.Router();
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");
const{verifyToken,verifyTokenandAuthorization}=require("../Api/Middleware");

router.post("/register", async (req, res) => {
  const { firstname, lastname, gender, email, contactnumber, password } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !gender ||
    !email ||
    !contactnumber ||
    !password
  ) {
    return res.json({ err: "Please Enter the fields properly" });
  }
  const sameNumber = await User.findOne({ contactnumber: contactnumber });
  if (sameNumber) {
    return res.json({ err: "Mobile Number Already Registered" });
  }
  const UserExist = await User.findOne({ email: email });
  if (UserExist) {
    return res.json({ err: "User Already exists ,Please Login" });
  }
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.json({
          error: err,
        });
      } else {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          email: req.body.email,
          contactnumber: req.body.contactnumber,
          password: hash,
        });
        user.save().then((result) => {
          console.log(result);
          return res.json({
            message: "User Registered SuccessFully",
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/login",async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ err: "Please Enter the Email" });
    }
    if (!password) {
      return res.json({ err: "Please Enter A  Password" });
    }
    const Matchmail = await User.findOne({ email: email });
    if (Matchmail) {
      const isMatch = await bcrypt.compare(password, Matchmail.password);
      {
        if (isMatch) {
          const token = jwt.sign(
            {
              email: User.email,
              userId: User._id,
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
});
router.get("/get", async (req, res) => {
  try {
    const getData = await User.find();
    if (getData) {
      return res.status(200).json(getData)
    } else {
      return res.json({ err: err });
    }
  } catch (err) {
    console.log(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      return res.status(200).json({
        message: "Deleted User",
      });
    } else {
      return res.json({
        err: err,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
