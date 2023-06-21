const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    createdAt:{
        type:Date,
        default:Date
    },
    updateAt:{
        type:Date,
        default:''
    }
});

const ProductImage = mongoose.model('productimages', ImageSchema);
module.exports = ProductImage;