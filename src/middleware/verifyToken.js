import jwt, { decode } from 'jsonwebtoken'



export const verifyToken=async(req,res,next)=>{

let{token}=req.headers
jwt.verify(token,'moha504',async(err,decoded)=>{

    if(err)
        {return res.status(401).json({messege:'invalid token',err})}else{req.user=decoded
            next()}

})

}