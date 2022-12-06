const authModel = require('../models/authmodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//for signup
exports.signup = async(req,res) => {
    const user = req.body;
    const password = await bcrypt.hash(req.body.password,saltRounds);
    const data = {...req.body,password:password};
    const userdata = new authModel(data);
    const isUser = await authModel.find({email:req.body.email});
    if(isUser.length > 0){
        res.json({result:'Email already registred,try new email..!',status:false});
        return;
    }else{
        try{
            await authModel.create(userdata);
            res.status(200).json(userdata);
        }catch(err){
            res.status(400).send(err);
        }
    }
}

//for login
exports.login = async(req,res) => {
    const user = await authModel.findOne({email:req.body.email});
    if(!user){
        res.status(404).json({error:'User not found!',status:false});
        return;
    }
    if(!(await bcrypt.compare(req.body.password,user.password))){
        res.status(401).json({error:'Wrong password!',status:false});
        return;
    }
    res.status(200).send(user);
}

//gives all the login users list
exports.authData = async(req,res) => {
    try{
        const authData = await authModel.find({});
        res.status(200).send(authData);
    }catch(err){
        res.status(400).json({error:err,status:false});
    }
}