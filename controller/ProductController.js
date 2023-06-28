const Product = require('../model/Product');
const slugify = require('slugify');
const path = require('path');
const fs = require("fs");

exports.createProduct = async (req, res, next)=>{
    try{
        if(req.body.name != ""){
            req.body.slug = slugify(req.body.name, '-');
        }
        if(req.files){
            let image = req.files.image;
            let uploadPath = path.join('uploads/products/'+image.name);
            image.mv(uploadPath, function(err) {
                if(err){
                    res.status(500).json({
                        success:false,
                        data:err
                    }) 
                };
            });
            req.body.image = `uploads/products/${image.name}`;
        }
        const product = await Product.create(req.body);
        return res.status(200).json({
            success:true,
            data:product
        });
    }catch(err){
        next(err)
    }
}

exports.productList = async (req, res, next)=>{
    try{
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            data:products,
            user:req.user
        });
    }catch(err){
        console.log(`productlist:${err}`);
        next(err);
    }
}

exports.deleteProduct = async (req, res, next)=>{
    try{
        const product = await Product.findOne({_id:req.params.id});
        if(product){
            fs.unlink(path.join(product.image) , (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not delete the file. " + err,
                    });
                }
            });
            let delted = await Product.findOneAndDelete({_id:req.params.id});
            if(delted){
                return res.status(200).json({
                    success:true, 
                    message:"Product deleted successfully !"
                });
            }
        }

        return res.status(200).json({
            success:false, 
            message:"Product does not exist !"
        });
    }catch(err){
        console.log(`deleteproduct:${err}`)
        next(err);
    }
}