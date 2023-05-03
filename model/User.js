const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Name field is must required!']
    },
    email:{
        type:String,
        require:[true, 'Email field is must required!']
    },
    phone:{
        type:String,
        require:[true, 'Phone number is must required!']
    },
    photo:{
        type:String,
        default:''
    },
    country:{
        type:Number,
        require:[true, 'Please select any courtry!']
    },
    state:{
        type:Number,
        require:[true, 'Please select any state!']
    },
    city:{
        type:Number,
        require:[true, 'Please select any city!']
    },
    password:{
        type:String,
        require:[true, 'Password field is must required!'],
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

UserSchema.pre('save', async function(next){
    if(this.password){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.password, salt);
        this.pasword = hash;
        next();
    }
})

const User = mongoose.model('users', UserSchema);
module.exports = User;