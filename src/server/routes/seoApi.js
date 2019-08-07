//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var blogModel = require('../models/blog');
var userModel = require('../models/user');
var seoModel = require('../models/seo');

exports.getallseo = async function(req, res)
{
    console.log('all blog action');
    try {
        var result = await seoModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleseo = async function(req, res)
{
    console.log('single seo action');
    try {
        var seo = await seoModel.findById(req.params.id).exec();
        //console.log(seo);
        res.send(seo);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleSeoByName = async function(req, res)
{
    console.log('By Page name action');
    try {
        var pageUrl = decodeURIComponent(req.params.pageUrl);
        console.log('Decoded Page Url===>'+req.params.pageUrl);
        var seo = await seoModel.findOne({pageUrl: req.params.pageUrl}).exec();
        //console.log('====>'+seo);
        if(seo){
            res.status(200).send(seo);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.insertseo = async function(req, res)
{
    console.log(req.body);
    try {    
        if(req.body.index == true )
        {
            req.body.index = 'INDEX';
        } else {
            req.body.index = 'NOINDEX';
        }

        if(req.body.follow == 'follow' )
        {
            req.body.follow = 'FOLLOW';
        } else {
            req.body.follow = 'NOFOLLOW';
        }   
        var seo = new seoModel(req.body);
        //console.log(blog);
        var result = await seo.save();       
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateseo = async function(req, res)
{
    console.log("update seo action....");
    //console.log(req.body);
    try {
        const seoId  = req.params.seoid;
        if(req.body.index == true )
        {
            req.body.index = 'INDEX';
        } else {
            req.body.index = 'NOINDEX';
        }

        if(req.body.follow == 'follow' )
        {
            req.body.follow = 'FOLLOW';
        } else {
            req.body.follow = 'NOFOLLOW';
        }       
        //console.log(req.body); 
        var seo = await seoModel.findById(seoId).exec();
        seo.set(req.body);
        var result = await seo.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteseo = async function(req, res)
{
    console.log('Delete seo Action');
    try {
        var result = await seoModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: 'You are deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};