//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var cmsModel = require('../models/cmspage');
var userModel = require('../models/user');


exports.getallpages = async function(req, res)
{
    console.log('all cms pages');
    try {
        var result = await cmsModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertpage = async function(req, res)
{
    const userId  = req.params.id;
    req.body.author = userId;
    //console.log(userId);
    //console.log(req.body);
    try {
        //console.log(user);
        if(userId)
        {
            var user = await userModel.findById(userId);
            var cms = new cmsModel(req.body);
            var result = await cms.save();

            //Assign cms page to author's
            user.cmspages.push(cms);
            await user.save();

            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updatepage = async function(req, res)
{
    console.log("update page action....");
    
    try {
        //console.log("update user Id ==>"+req.params.id);
        const userId  = req.params.id;
        req.body.author = userId;
        //var modifiedDesc = json_encode(req.body.description);
        //req.body.description = modifiedDesc;
        
        const pageId  = req.params.pageid;
        var cmspage = await cmsModel.findById(pageId).exec();
        //console.log(cmspage);
        cmspage.set(req.body);
        
        var result = await cmspage.save();
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deletepage = async function(req, res)
{
    try {
        var result = await cmsModel.deleteOne({ _id: req.params.id }).exec();
        userModel.findByIdAndUpdate(req.params.userId,
            {$pull: {cmspages: req.params.id}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    res.status(500).send(error);
                }else{
                    //do stuff
                }
            }
        );
        res.status(200).send({ message: 'You are deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};
