const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            return res.status(400).json({
                success:false,
                error:'Password does not match!'
            });
        }

        if(req.body.password!=""){
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
        }
        
        const user = await User.create(req.body);
        res.status(200).json({
            success:true,
            data:user,
            message:'User registered successfully !'
        });
    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next)=>{
    try{
        if(req.body.email==""){
            return res.status(400).json({
                success:false,
                error:'Email is required!'
            });
        }

        if(req.body.password==""){
            return res.status(400).json({
                success:false,
                error:'Password is required!'
            }); 
        }
        // const emailRegexp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        // if(emailRegexp.test(req.body.email)){
        //     return res.status(400).json({
        //         success:false,
        //         error:'Invalid Email!'
        //     }) 
        // }
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({
                success:false,
                error:'User does not exist'
            })
        }

        let matched = await bcrypt.compare(req.body.password, user.password);
        if(matched === true){
            const expiresIn = '24h';
            const token = jwt.sign({id: user._id }, process.env.TOKEN_KEY, {expiresIn: expiresIn});
            jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded) {
                if(err){
                    res.status(401).json({
                        success:false,
                        message:err.message
                    });
                }else{
                    res.cookie('auth', token, {
                        maxAge: 1000 * 60 * 60 * 24,
                        expires: 1000 * 60 * 60 * 24,
                        Domain:'http://localhost:3000',
                        path:'/',
                        secure: true,
                        httpOnly: false,
                        SameSite: 'none'
                    })
                    res.status(200).json({
                        success:true,
                        token:token,
                        message:'Login successfully!'
                    });
                }
            });
        }else{
            return res.status(400).json({
                success:false,
                error:'Invalid login details!'
            })
        }
        return res.status(200).json({
            success:true,
            error:user
        })
    }catch(err){
        console.log(err)
        next(err);
    }
}