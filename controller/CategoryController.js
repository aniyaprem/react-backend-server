const Category = require('../model/Category');
const slugify = require('slugify');
const path = require('path');
var mongoose = require('mongoose');


exports.addCategory = async (req, res, next)=>{
    try{
        req.body.photo = "";
        if(req.files){
            let image = req.files.image;
            let uploadPath = path.join('uploads/'+image.name);
            image.mv(uploadPath, function(err) {
                if(err){
                    res.status(500).json({
                        success:false,
                        data:err
                    }) 
                };
            });
            req.body.photo = image.name;
        }
        
        if(req.body.name != "" && req.body.name.split(" ").length > 0){
            req.body.slug = slugify(req.body.name, '-');
        }else{
            req.body.slug = req.body.name;
        }

        req.body.parentId = req.body.parentId == "" ? new mongoose.Types.ObjectId(): req.body.parentId;
        await Category.create(req.body);
        return res.status(200).json({
            success:true,
            mesage:'Category added successfully !'
        });
    }catch(err){
        console.log(`addcategoryError: ${err}`);
        next(err);
    }
}

exports.categoryList = async (req, res, next)=>{
    try{
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            data:categories
        });
    }catch(err){
        console.log(`catslist: ${err}`);
        next(err);
    }
}

exports.deleteCatgory = async(req, res, next)=>{
    try{
        const category = await Category.findOneAndDelete({_id:req.params.id});
        if(!category){
            return res.status(200).json({
                success:false, 
                message:"Category does not found !"
            });
        }

        return res.status(200).json({
            success:true, 
            message:"Category deleted successfully !"
        });
    }catch(err){
        console.log(`deleteCat: ${err}`);
        next(err);
    }
}