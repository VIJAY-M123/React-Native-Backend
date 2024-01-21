const express = require('express');
const app = express();
app.use(express.json());
const UserModel = require('./Model/UserModel');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');

const secretKey = "dafsfffsavasfsfsfsf";

const router = express.Router();

router.post("/login", async (req,res)=>{
  const {email, password} = req.body;
  const user = await UserModel.findOne({email:email})

  if(!user){
    return res.json({Message:"User Not Fount Please Register"})
  }

  if(bcrypt.compare(password, user.password)){
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    if(res.status(201)){
      return res.json({message:"User Login sucessfully", token:token})
    }
    else{
      return res.json({message:"User Login Error"})
    }
  }
  res.json({message:'Invalid Password'})
})

router.post("/register", async (req,res)=>{
const {username, email, password} = req.body;
const oldUser = await UserModel.findOne({email:email})
const hashpassowrd = await bcrypt.hash(password,10)

if(oldUser){
     return res.send({status:'error', data:"User already register"})
 }

 try{
    const user = new UserModel({
        username:username,
        email:email,
        password:hashpassowrd
    })
    await user.save();
    res.status(200).json({message:"User register Successfully", username:username})
 }
 catch(err){
  res.status(500).json({message:"User register error"})
 }

})


module.exports = router;