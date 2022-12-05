const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true });
const SignupModel = mongoose.model('SignupModel', SignupSchema, 'User Login Details');
module.exports = SignupModel;