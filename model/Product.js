const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Product name is required!']
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
        type:String,
        default:null
    },
    description:{
        type:Number,
        required:[true, 'Product description is required!']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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