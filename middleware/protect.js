const jwt  = require('jsonwebtoken')

const Protect = async (req, res, next)=>{
    try{
        const token = req.headers['authorization'];
        if(!token.startsWith('Bearer')){
            return res.status(401).json({
                success:false,
                error:'Unauthorize user'
            });
        }

        let tokenr = req.headers.authorization.split(" ")[1];
        jwt.verify(tokenr, process.env.TOKEN_KEY);
        next();
    }catch(err){
        console.log(`protect:${err}`);
        next(err);
    }
}

module.exports = Protect;

