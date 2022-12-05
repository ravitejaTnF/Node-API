const authModel = require('../models/authmodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async(req,res) => {
    const user = req.body;
    const password = await bcrypt.hash(req.body.password,saltRounds);
    const data = {...req.body,password:password};
    const userdata = new authModel(data);
    try{
        await authModel.create(userdata);
        res.status(200).json(userdata);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.login = async(req,res) => {
    const user = await authModel.findOne({email:req.body.email});
    if(!user){
        res.status(404).json({error:'User not found!'});
        return;
    }
    if(!(await bcrypt.compare(req.body.password,user.password))){
        res.status(401).json({error:'Wrong password!'});
        return;
    }
    res.status(200).send(user);
}

exports.authData = async(req,res) => {
    try{
        const authData = await authModel.find({});
        res.status(200).send(authData);
    }catch(err){
        res.status(400).json(err);
    }
}