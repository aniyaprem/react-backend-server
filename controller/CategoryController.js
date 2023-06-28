const Category = require('../model/Category');
var mongoose = require('mongoose');
const slugify = require('slugify');
const path = require('path');
const fs = require("fs");


exports.addCategory = async (req, res, next)=>{
    try{
        req.body.photo = "";
        if(req.files){
            let image = req.files.image;
            let uploadPath = path.join('uploads/category/'+image.name);
            image.mv(uploadPath, function(err) {
                if(err){
                    res.status(500).json({
                        success:false,
                        data:err
                    }) 
                };
            });
            req.body.photo = 'uploads/category/'+image.name;
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
        const category = await Category.findOne({_id:req.params.id});
        if(category){
            fs.unlink(path.join(category.photo) , (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not delete the file. " + err,
                    });
                }
            });

            const deleted = await Category.findOneAndDelete({_id:req.params.id});
            if(deleted){
                return res.status(200).json({
                    success:true, 
                    message:"Category deleted successfully !"
                });
            }
        }
        if(!category){
            return res.status(200).json({
                success:false, 
                message:"Category does not found !"
            });
        }
    }catch(err){
        console.log(`deleteCat: ${err}`);
        next(err);
    }
}

exports.singleCategory = async (req, res, next)=>{
    try{
        const category = await Category.findOne({_id:req.params.id});
        if(!category){
            return res.status(200).json({
                success:false, 
                message:"Category does not found !"
            });
        }

        return res.status(200).json({
            success:true, 
            data:category
        });
    }catch(err){
        console.log(`SingleCategory: ${err}`)
        next(err);
    }
}

exports.updateCategory = async (req, res, next)=>{
    try{
        req.body.photo = "";
        if(req.files){
            const category = await Category.findOne({_id:req.params.id});
            if(category){
                fs.unlink(path.join(category.photo) , (err) => {
                    if (err) {
                        res.status(500).send({
                            message: "Could not delete the file. " + err,
                        });
                    }
                });
            }

            let image = req.files.image;
            let uploadPath = path.join('uploads/category/'+image.name);
            image.mv(uploadPath, function(err) {
                if(err){
                    res.status(500).json({
                        success:false,
                        data:err
                    }) 
                };
            });
            req.body.photo = 'uploads/category/'+image.name;
        }else{
            req.body.photo = req.body.imagepath
        }
        
        if(req.body.name != "" && req.body.name.split(" ").length > 0){
            req.body.slug = slugify(req.body.name, '-');
        }else{
            req.body.slug = req.body.name;
        }

        // req.body.parentId = req.body.parentId == "" ? new mongoose.Types.ObjectId(): req.body.parentId;
        const category = await Category.findOneAndUpdate(req.params.id, {$set : req.body});
        if(!category){
            return res.status(200).json({
                success:false, 
                message:"Category does not found !"
            });
        }

        return res.status(200).json({
            success:true, 
            message:'Category updated successfully'
        });
    }catch(err){
        console.log(`updateCategory: ${err}`)
        next(err);
    }
}