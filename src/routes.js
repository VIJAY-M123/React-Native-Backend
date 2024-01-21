const express = require('express');
app.use(express.json());
const UserModel = require('./Model/UserModel');
const bcrypt = require('bcrypt')

const router = express.Router();

router.get("/get",(req,res)=>{
  console.log("Hello")
  res.send("ffdfsdd")
})

router.post("/register", async (req,res)=>{
  console.log("Body",req.body);
 const {username, email, password} = req.body;
const oldUser = await UserModel.findOne({email:email})
console.log("oldUser", oldUser);


if(oldUser){
     return res.send({status:'error', data:"User already register"})
 }
 
 try{
    const user = new UserModel({
        username:username,
        email:email,
        password:password
    })
    await user.save();
    //res.send({status:'ok', data:"User registyer Successfully"})
    res.status(200).json({message:"User register Successfully"})
 }
 catch(err){
  //res.send({data:"User Not register"})
  console.log("error",err)
  res.status(500).json({message:"User register error"})
 }

})


module.exports = router;