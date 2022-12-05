const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            max:99
        },
        userId:String,
    },
    {
        strict:true,
        timestamps:true
    }
);
const User = mongoose.model('User',userSchema,'User Data');
module.exports = User;