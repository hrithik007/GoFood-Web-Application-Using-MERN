const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameisHrithik"
router.post("/loginuser", async(req,res)=>{
    let email = req.body.email;

    try{
       let userData = await User.findOne({email})
       console.log(userData);
       if(!userData){
        return res.status(400).json({errors: "Invalid Email"})
       }
       const pwdCmp  = bcrypt.compare(req.body.password,userData.password)
        if(!pwdCmp ){
        return res.status(400).json({errors: "Invalid Password"})
     }
     
     const data = {
        user:{
            id:userData.id
        }
     }
     const authToken = jwt.sign(data,jwtSecret)

     return res.status(200).json({success: true,authToken:authToken});
    

    }   
    catch(error){
        console.log("Erorr : ",error)
        res.json({success:false});
    }
})


router.post("/createuser", async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try{
       await User.create({
        name: req.body.name,
        password:secPassword,
        email:req.body.email
       })
       res.json({success:true});
    }catch(error){
        console.log("Erorr : ",error)
        res.json({success:false});
    }
})

module.exports = router;