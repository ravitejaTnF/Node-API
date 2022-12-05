const userModel = require('../models/usermodel');
const { ObjectId } = require('mongodb');

exports.getAllUsers = async(req,res) => {
    const allUsersData = await userModel.find({});
    try{
        res.status(200).send(allUsersData);
    }catch(err){
        res.json(err);
    }
}

exports.saveNewUser = async(req,res) => {
    try{
        const newUser = await userModel.create(req.body);
        res.json(newUser);
    }catch(err) {
        res.send(err);;
    }
}

exports.getSingleUser = async(req,res) => {
    let _id = ObjectId(req.params.id);
    const user = await userModel.find({_id});
    if(!user){
        res.json({result:'No user found'});
        return;
    }
    res.json(user);
}

exports.updateSingleUser = async(req,res) => {
    let _id = ObjectId(req.params.id);
    try{
        await userModel.updateOne({_id},{$set:req.body});
        res.send({result:true});
    }catch(err){
        res.send(err);
    }
}

exports.deleteSingleUser = async(req,res) => {
    let _id = ObjectId(req.params.id);
    try{
        await userModel.deleteOne({_id});
        res.send({result:true});
    }catch(err){
        res.send(err);
    }
}

exports.getRelatedDataofUser = async(req,res) => {
    let _id = ObjectId(req.params.userId);
    try{
        const data = await userModel.find({userId:_id});
        res.status(200).json(data);
    }catch(err){
        res.status(400).send(err);
    }
}