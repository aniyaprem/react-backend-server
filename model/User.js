const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name field is must required!']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email field is must required!']
    },
    phone:{
        type:Number,
        unique:true,
        required:[true, 'Phone number is must required!']
    },
    photo:{
        type:String,
        default:''
    },
    country:{
        type:Number,
        required:[true, 'Please select any courtry!']
    },
    state:{
        type:Number,
        required:[true, 'Please select any state!']
    },
    city:{
        type:Number,
        required:[true, 'Please select any city!']
    },
    role:{
        type:String,
        enum : ['user','admin'],
        default: 'user'
    },
    password:{
        type:String,
        required:[true, 'Password field is must required!'],
        min: [8, 'Minimum 8 charcters required for password'],
    },
    createAt:{
        type:Date,
        default:Date
    },
    updateAt:{
        type:Date,
        default:''
    }
});

// UserSchema.pre('save', async function(next){
//     try{
//         const user = this;
    
//         bcrypt.genSalt(10, function(err, salt){
//             if (err){ return next(err) }
//             bcrypt.hash(user.password, salt, null, function(err, hash){
//                 if(err){return next(err)}
//                 user.password = hash;
//                 next();
//             })
//         })
//     }catch(err){
//         console.log(err)
//         return next(err);
//     }
    
// })

const User = mongoose.model('users', UserSchema);
module.exports = User;