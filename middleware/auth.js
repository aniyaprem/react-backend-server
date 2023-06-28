const jwt  = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next)=>{
    try{
        const token = req.headers['authorization'];
        if(!token.startsWith('Bearer')){
            return res.status(401).json({
                success:false,
                error:'Unauthorize user'
            });
        }

        let tokenr = req.headers.authorization.split(" ")[1];
        let id = jwt.decode(tokenr).id;
        const user = await User.findById(id).select('-password');
        req.user = user;
        next();
    }catch(err){
        console.log(`protect:${err}`);
        next(err);
    }
}

module.exports = auth;