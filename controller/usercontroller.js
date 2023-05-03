const User = require('../model/User');

exports.register = async (req, res, next)=>{
    try{
        await User.create(req.body);
        res.status(200).json({
            success:true,
            message:'User registered successfully !'
        });

    }catch(err){
        console.log(err)
        next(err)
    }
}