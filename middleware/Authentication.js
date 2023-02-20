const jwt=require("jsonwebtoken")
const authentication=(req,res,next) =>
{
    const token=req.headers.authorization;
    if(token)
    {
        const decode=jwt.verify(token,"Social")
        if(decode)
        {
            const userId=decode.userId;
            req.body.userId=userId;
            next()
        } else
        {
            res.send("Please Login")
        }
    } else
    {
        res.send("login")
    }
}

module.exports={authentication}