const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Product name is required!']
    },
    slug:{
        type:String,
        default:null
    },
    image:{
        type:String,
        required:[true, 'Product image is required!']
    },
    price:{
        type:Number,
        required:[true, 'Product price is required!']
    },
    saleprice:{
        type:Number,
        required:[true, 'Product sale price is required!']
    },
    categories:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null
    },
    description:{
        type:String,
        required:[true, 'Product description is required!']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
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

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;