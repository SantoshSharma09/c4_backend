const express=require("express")
const {UserModel}=require("../Models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserRoutes=express.Router()

UserRoutes.post("/register",async(req,res) =>
{
    const {email,gender,city,age,password,name}=req.body;
    const email_reg=await UserModel.find({email})
    if(email_reg?.email){
        res.send("User already exist,please login")
    } else
    {
        try
        {
            bcrypt.hash(password,5,async (err,hash) =>
            {
                const user=new UserModel({name,email,gender,city,age,password:hash})
                await user.save()
                res.send("Registeration Done Successfully")
            })
        } catch(err)
        {
            res.send("registeration failed")
        }
    }
})

UserRoutes.post("/login",async(req,res) =>
{
    const {email,password}=req.body
    
    try
    {
        const user=await UserModel.find({email})
        if(user.length>0)
        {
            const pass=user[0].password;
            bcrypt.compare(password,pass,function (err,result)
            {
                if(result)
                {
                    const token=jwt.sign({userId: user[0]._id},"Social")
                    res.send({"message":"Login Successful",token:token})
                }
            })
        }
    
        } catch(err)
        {
            res.send({"Error":err.message})
        }
    
})

module.exports={UserRoutes}