//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var projectModel = require('../models/project');
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


exports.getallproject = async function(req, res)
{
    console.log('all seo action');
    try {
        var sortDesc = { created_at: -1 };
        var result = await projectModel.find().sort(sortDesc).exec();
        //console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleproject = async function(req, res)
{
    console.log('all project action');
    try {
        var project = await projectModel.findById(req.params.id).exec();
        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getLastSixProject = async function(req, res)
{
    console.log('Latest project action');
    try {
        var mysort = { created_at: -1 };
        var project = await projectModel.find().limit(6).sort(mysort).exec();
        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.getSingleprojectByName = async function(req, res)
{
    console.log('single project by name action');
    try {
        var project = await projectModel.findOne({slug: req.params.slug}).exec();
        if(project){
            res.status(200).send(project);
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
    //console.log(id);
    try {
        var projectData = await projectModel.findById(id).exec();
        if(projectData.projectimage){
            fs.unlinkSync(appRoot.path + "/public/images/big_"+projectData.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/medium_"+projectData.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/small_"+projectData.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+projectData.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/"+projectData.projectimage);
        }

        var project = await projectModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { projectimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(blog);
        res.send(project);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertproject = async function(req, res)
{
    const userId  = req.params.id;
    console.log(req.body);
    if(req.body.projectimage !== '')
    {
        req.body.projectimage = req.file.filename;
        await resizer(appRoot.path + "/public/images/"+req.file.filename, setup);
    }
    
    try {
        
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
            if(user){
                var blog = new projectModel(req.body);
                var result = await blog.save();
                res.send(result);
            } else {
                res.status(401).send({ "code": 401, message: 'You are unauthorized' });
            }
            
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};

exports.updateproject = async function(req, res)
{
    console.log("update project action....");
    try {
        if(req.file !== undefined){
            req.body.projectimage = '';
            req.body.projectimage = req.file.filename;
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
        
        const projectId  = req.params.projectid;
        
        var project = await projectModel.findById(projectId).exec();
        
        project.set(req.body);
        
        var result = await project.save();
        
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteproject = async function(req, res)
{
    console.log('Delete project Action');
    try {
        var project = await projectModel.findById(req.params.id).exec();
        //console.log(blog);
        if(project.projectimage){
            fs.unlinkSync(appRoot.path + "/public/images/big_"+project.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/medium_"+project.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/small_"+project.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+project.projectimage);
            fs.unlinkSync(appRoot.path + "/public/images/"+project.projectimage);
        }
        var result = await projectModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: 'You are deleted successfully' });

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};