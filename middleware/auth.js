var jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{

    try {
        
        const token = req.headers.authorization

        if(!token){
            return res.status(400).json({error:"Kindly Login First"})
        }

        jwt.verify(token, '123', function(err, decoded) {

            if(err){
                return res.status(400).json({error:"Invalid Token Login Again"})
            }

            req.userInfo = decoded

            next()

        });

    } catch (error) {
        res.json({error:error.message})
    }

}

module.exports = auth