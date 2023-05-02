exports.Protect = async (req, res, next)=>{
    try{
        console.log(req.headers);
        next()
    }catch(err){
        next(err)
    }
}