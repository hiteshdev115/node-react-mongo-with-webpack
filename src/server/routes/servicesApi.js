//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var serviceModel = require('../models/services');
var userModel = require('../models/user');
var resizer = require('node-image-resizer');
const setup = { 
    all: {
      path: appRoot.path + "/public/images/",
      quality: 80
    },
    versions: [{
      prefix: 'big_',
      width: 1920,
      height: 1080
    }, {
      prefix: 'medium_',
      width: 1024,
      height: 768
    }, {
      quality: 100,
      prefix: 'small_',
      width: 160,
      height: 112
    },
    {
        quality: 100,
        prefix: 'thumbnail_',
        width: 100,
        height: 100
      }]
  };

exports.getallservices = async function(req, res)
{
    console.log('all service action');
    try {
        var sortDesc = { created_at: -1 };
        var result = await serviceModel.find().sort(sortDesc).exec();
        //console.log(result);
        if(result == '')
        {
            res.status(200).send({ message: 'Sorry, No data found!' });
        } else {
            res.status(200).send(result);
        }
        //res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.getSingleservice = async function(req, res)
{
    console.log('single service action');
    try {
        var service = await serviceModel.findById(req.params.id).exec();
        res.send(service);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleserviceByName = async function(req, res)
{
    console.log(req.params.servicesname);
    
    try {
        var service = await serviceModel.findOne({servicesname: req.params.servicesname}).populate('author').exec();
        if(service){
            res.status(200).send(service);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getRandomservice = async function(req, res)
{
    var count = 4;
    try {
        var mysort = { created_at: -1 };
        var service = await serviceModel.find({servicesname : {$ne :req.params.servicesname}}).limit(4).sort(mysort).exec();
        if(service){
            res.status(200).send(service);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.removeThumb = async function(req, res)
{
    console.log('remove thumb');
    var id = req.body.id;
    console.log(id);
    try {
        var serviceData = await serviceModel.findById(id).exec();
        if(serviceData.serviceimage){
                fs.unlinkSync(appRoot.path + "/public/images/big_"+serviceData.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/medium_"+serviceData.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/small_"+serviceData.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+serviceData.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/"+serviceData.serviceimage);
        }

        var service = await serviceModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { serviceimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(service);
        res.status(200).send(service);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.insertservice = async function(req, res)
{
    console.log("insert service action");
    const userId  = req.params.id;
    req.body.author = userId;
    
    if(req.body.serviceimage !== '')
    {
        req.body.serviceimage = req.file.filename;
        await resizer(appRoot.path + "/public/images/"+req.file.filename, setup);
    }
    
    try {
        //console.log(user);
        
        if(userId)
        {
            if(req.body.index == 'Yes' )
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
            var user = await userModel.findById(userId);
            var service = new serviceModel(req.body);
            var result = await service.save();
            //Assign service page to author's
            user.services.push(service);
            //console.log(result);
            await user.save();

            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateservice = async function(req, res)
{
    console.log("update service action....");
    
    try {
        if(req.file !== undefined){
            req.body.serviceimage = '';
            req.body.serviceimage = req.file.filename;
            await resizer(appRoot.path + "/public/images/"+req.file.filename, setup);
        }
        if(req.body.index == 'Yes' )
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
        const userId  = req.params.id;
        req.body.author = userId;
                
        const serviceId  = req.params.serviceid;
        //console.log(blogId);
        var service = await serviceModel.findById(serviceId).exec();
        
        service.set(req.body);
        
        var result = await service.save();
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteservice = async function(req, res)
{
    console.log('Delete Services Action');
    try {
        var service = await serviceModel.findById(req.params.id).exec();
        //console.log(service);
        if(service.serviceimage){
                fs.unlinkSync(appRoot.path + "/public/images/big_"+service.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/medium_"+service.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/small_"+service.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+service.serviceimage);
                fs.unlinkSync(appRoot.path + "/public/images/"+service.serviceimage);
        }

        var result = await serviceModel.deleteOne({ _id: req.params.id }).exec();
        userModel.findByIdAndUpdate(req.params.userId,
            {$pull: {services: req.params.id}},
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
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};
