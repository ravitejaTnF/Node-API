const express = require('express');
const app = express();
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

//for home request
app.get('/', (req, res) => {
    res.send({ result: 'Hello..!' });
})
//getting all the users
app.get('/all-users', UserController.getAllUsers);
//posting a single user to db
app.post('/user',UserController.saveNewUser);
//getting single user
app.get('/user/:id',UserController.getSingleUser);
//update a user
app.patch('/user/:id',UserController.updateSingleUser);
//delete a user
app.delete('/user/:id',UserController.deleteSingleUser);
//signup a new user
app.post('/auth/signup',AuthController.signup);
//checking a user is logged in or not
app.post('/auth/login',AuthController.login);
//getting the login users data
app.get('/auth-data',AuthController.authData);
//return data belongs to a particular user
app.get('/userdata/:userId',UserController.getRelatedDataofUser);
//for bad request
app.get('/*', (req, res) => {
    res.send({ result: 'Error' });
})
module.exports = app;