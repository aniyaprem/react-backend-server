const ProductImage = require('../model/ProductImage');
const Product = require('../model/Product');
const slugify = require('slugify');
const path = require('path');

exports.createProduct = async (req, res, next)=>{
    try{
        if(req.body.name != ""){
            req.body.name = slugify(req.body.name, '-');
        }
        const product = await Product.create(req.body);
        
        if(req.files){
            for(let x in req.files.image){
                let image = req.files.image[x];
                let uploadPath = path.join('uploads/'+image.name);
                image.mv(uploadPath, function(err) {
                    if(err){
                        res.status(500).json({
                            success:false,
                            data:err
                        }) 
                    };
                });

                const Images = await ProductImage.create({image:req.files.image[x].name});
                console.log(Images);
                console.log(req.files.image[x].name);
            }
        }

        return res.status(200).json({
            success:true,
            data:product
        });
        
        
    }catch(err){
        next(err)
    }
}