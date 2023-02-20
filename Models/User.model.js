const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    city: String,
    age: Number,
    password:String
})
const UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}