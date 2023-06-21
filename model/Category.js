const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true, 'Category field is required!']
    },
    slug:{
        type:String
    },
    photo:{
        type:String,
        required:[true, 'Image is required!']
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
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

const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;