const express=require("express")
const {PostModel}=require("../Models/Post.model")
const PostRoutes=express.Router()

PostRoutes.get("/",async(req,res) =>
{
    try
    {
        const {device1,device2,device3}=req.query
        if(device1)
        {
            const Post=PostModel.find({device:device1})
            res.send(JSON.stringify(Post))   
        } else if(device2&&device3)
        {
            const Post=PostModel.find({$or: [{device: device2},{device:device3}]})
            res.send(JSON.stringify(Post))   
        }
    } catch(err)
    {
        res.send({"Error":err.message})
    }
})
PostRoutes.get("/top",async(req,res) =>
{
    try
    {
        const Post= await PostModel.find()
        res.send(Post)
    } catch(err)
    {
        res.send({"Error":err.message})
    }
})

PostRoutes.post("/create",async (req,res) =>
{
    const inputData=req.body;
    inputData.userid=req.body.userId
    try
    {
        const Post=new PostModel(inputData);
        await Post.save()
        res.send("Post Created Successfully")
    } catch(err)
    {
        res.send({"Error":err.message})
    }
})
PostRoutes.patch("/update/:id",async(req,res) =>
{
    const userid=req.body.id;
    const id=req.params.id;
    const update=req.body;
    try
    {
        const Post=await PostModel.find({_id: id})
        if(userid!==Post[0].userid)
        {
            res.send("not authorized")
        } else
        {
            await PostModel.findByIdAndUpdate({_id: id},update)
            res.send("Post Updated Successfully")
        }
    } catch(err)
    {
        res.send({"Error":err.message})
}
})
PostRoutes.delete("/delete?:id",async(req,res) =>
{
    const userid=req.body.id;
    const id=req.params.id;
    try
    {
        const Post=await PostModel.findOne({_id: id})
        if(userid!==Post.userid)
        {
            res.send("not authorized")
        } else
        {
            await PostModel.findByIdAndDelete({_id: id},update)
            res.send("Post Deleted Successfully")
        }
    } catch(err)
    {
        res.send({"Error":err.message})
}
})
module.exports={PostRoutes}