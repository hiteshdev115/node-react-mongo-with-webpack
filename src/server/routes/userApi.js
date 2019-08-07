var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var userModel = require('../models/user');
var carModel = require('../models/car');

exports.insertuser = async function(req, res)
{
    console.log("insert user api");
    try {
        var user = new userModel(req.body);
        var result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getallUser = async function(req, res)
{
    try {
        var result = await userModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getUser = async function(req, res)
{
    try {
        var person = await userModel.findById(req.params.id).exec();
        res.send(person);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async function(req, res)
{
    console.log("update user action....");
    try {
        //console.log("update user Id ==>"+req.params.id);
        var person = await userModel.findById(req.params.id).exec();
        person.set(req.body);
        var result = await person.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async function(req, res)
{
    try {
        var result = await userModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUserCar = async function(req, res)
{
    try{
        const userId = req.params.id;
        const user = await userModel.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    } catch(error){
        res.status(500).send(error);
    }
}

exports.newUserCar = async function(req, res)
{
    try {
        const userId  = req.params.id;
        console.log(userId);
        // create new car
        var newCar = new carModel(req.body);
        //get user
        const user = await userModel.findById(userId);
        //Assign user as a car's seller
        newCar.seller = user;
        //Save the car
        await newCar.save();
        //Add car to the user's selling array 'cars'
        user.cars.push(newCar);
        //save the user
        await user.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).send(error);
    }
};