//var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var blogModel = require('../models/blog');
var userModel = require('../models/user');
var categoryModel = require('../models/blogcats');
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

exports.getallblog = async function(req, res)
{
    console.log('all blog action');

    try {
        var sortDesc = { created_at: -1 };
        var result = await blogModel.find().populate('author').populate('blogcats').sort(sortDesc).exec();
        //console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSingleblog = async function(req, res)
{
    console.log('Single blog action');
    try {
        var blog = await blogModel.findById(req.params.id).exec();
        res.send(blog);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getLastThreeBlog = async function(req, res)
{
    console.log('Latest blog action');
    try {
        var mysort = { created_at: -1 };
        var blog = await blogModel.find().populate('author').limit(3).sort(mysort).exec();
        res.send(blog);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};



exports.getSingleblogByName = async function(req, res)
{
    console.log('by name blog action');
    try {
        var blog = await blogModel.findOne({blogname: req.params.blogname}).populate('author').populate('blogcats').exec();
        var viewcnt = blog.viewCount + 1;
        console.log(viewcnt);
        blog.set({viewCount : viewcnt});
        blog.save();

        if(blog){
            res.status(200).send(blog);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSearchByCatName  = async function(req, res)
{
    console.log('search by category name action');
    try {
        var singleCategory = await categoryModel.findOne({categoryname: req.params.categoryname}).exec();
        var searchblog = await blogModel.find({blogcats: singleCategory._id}).populate('author').populate('blogcats').exec();
        //console.log(searchblog);
        if(searchblog.length > 0){
            res.status(200).send(searchblog);
        } else {
            res.status(400).send({ "code": 400, message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getRandomblog = async function(req, res)
{
    var count = 4;
    try {
        var mysort = { created_at: -1 };
        var blog = await blogModel.find({blogname : {$ne :req.params.blogname}}).limit(4).sort(mysort).exec();
        if(blog){
            res.status(200).send(blog);
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
        var blogData = await blogModel.findById(id).exec();
        //console.log(blogData.blogimage);
        var checkImage = blogData.blogimage;
        if(checkImage){
            fs.unlinkSync(appRoot.path + "/public/images/big_"+blogData.blogimage);
            fs.unlinkSync(appRoot.path + "/public/images/medium_"+blogData.blogimage);
            fs.unlinkSync(appRoot.path + "/public/images/small_"+blogData.blogimage);
            fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+blogData.blogimage);
            fs.unlinkSync(appRoot.path + "/public/images/"+blogData.blogimage);
        }

        var blog = await blogModel.findOneAndUpdate(    
            { _id: id },      
            { $set: { blogimage: "" } },      
            {
               new: true
            }    
        ).exec();
        //console.log(blog);
        res.send(blog);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertblog = async function(req, res)
{
    //console.log(req);
    const userId  = req.params.id;
    req.body.author = userId;
    //console.log(userId);
    
    console.log(req.body);
    if(req.body.blogimage !== '')
    {
        req.body.blogimage = req.file.filename;
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
            var blog = new blogModel(req.body);
            //console.log(blog);
            var result = await blog.save();
            
            //Assign blog to author's
            user.blog.push(blog);
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

exports.updateblog = async function(req, res)
{
    console.log("update page action....");
    try {
        
        if(req.file !== undefined){
            req.body.blogimage = '';
            //console.log("update user Id ==>"+req.body.blogimage);
            req.body.blogimage = req.file.filename;
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
                
        const blogId  = req.params.blogid;
        
        var blog = await blogModel.findById(blogId).exec();
        
        blog.set(req.body);
        
        var result = await blog.save();
        //console.log(blog.blogcats);
        var catArray = req.body.category.split(",");
        
        //Remove Old category from blogcats field in bolg
        blogModel.findByIdAndUpdate(blogId,
            {$set: {blogcats: []}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    console.log(err);
                }else{
                    console.log('update....');
                }
            }
        );
        //Update New category into blogcats field in bolg
        var UpdatedCategory = await categoryModel.find({_id:{$in:catArray}}).exec();
        blogModel.findByIdAndUpdate(blogId,
            {$push: {blogcats: UpdatedCategory}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    console.log(err);
                }else{
                    console.log('update....');
                }
            }
        );

        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'System could not found the data' });
    }
};

exports.deleteblog = async function(req, res)
{
    console.log('Delete Blog Action');
    try {
        var blog = await blogModel.findById(req.params.id).exec();
        //console.log(blog);
        if(blog.blogimage){
                fs.unlinkSync(appRoot.path + "/public/images/big_"+blog.blogimage);
                fs.unlinkSync(appRoot.path + "/public/images/medium_"+blog.blogimage);
                fs.unlinkSync(appRoot.path + "/public/images/small_"+blog.blogimage);
                fs.unlinkSync(appRoot.path + "/public/images/thumbnail_"+blog.blogimage);
                fs.unlinkSync(appRoot.path + "/public/images/"+blog.blogimage);
        }

        var result = await blogModel.deleteOne({ _id: req.params.id }).exec();
        userModel.findByIdAndUpdate(req.params.userId,
            {$pull: {blog: req.params.id}},
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