//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var settingModel = require('../models/settings');


exports.getSetting = async function(req, res)
{
    console.log('all setting data');
    try {
        var result = await settingModel.find().exec();
        //console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.removeLogo = async function(req, res)
{
    console.log('remove thumb');
    var id = req.body.id;
    console.log(id);
    try {
        var setting = await settingModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { logoimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(setting);
        res.send(setting);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertSetting = async function(req, res)
{
    if(req.body.logoimage !== '')
    {
        req.body.logoimage = req.file.filename;
    }
    
    try {
        var setting = new settingModel(req.body);
        //console.log(setting);
        var result = await setting.save();
        
        res.send(result);        
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateSetting = async function(req, res)
{
    try {
        if(!req.file)
        {
            req.body.logoimage = '';
        } else {
            req.body.logoimage = req.file.filename;
        }
        const settingid  = req.body.id;
        var setting = await settingModel.findById(settingid).exec();
        setting.set(req.body);
        var result = await setting.save();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

