const jwt =require("jsonwebtoken")

const auth=(role)=>(req,res,next)=>{
    const {authorization}=req.headers
    const token=authorization.split(" ")[1]

    if (token===undefined){
       return res.status(401).send({error:"Unauthorized"})
    }

    jwt.verify(token,"abcdefg",(err,payload)=>{
        if (err){
            res.status(400).send("Invalid JWT Token")
        }else{
            if(payload.role !==role){
                return res.status(403).send({error:"Forbidden"})
            }
            
            req.user=payload
            next()
        }
    })
}

module.exports=auth