const mongoose = require('mongoose')

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
    country:{
        type:String,
        require:[true, 'Please select any courtry!']
    },
    state:{
        type:String,
        require:[true, 'Please select any state!']
    },
    city:{
        type:String,
        require:[true, 'Please select any city!']
    },
    password:{
        type:String,
        require:[true, 'Password field is must required!'],
        min: [8, 'Minimum 8 charcters required for password'],
    },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;