var categoryModel = require('../models/blogcats');
var blogModel = require('../models/blog');

exports.getallcategory = async function(req, res)
{
    console.log('all category');
    try {
        var sortDesc = { created_at: -1 };
        var result = await categoryModel.find().sort(sortDesc).exec();
        //console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSinglecategory = async function(req, res)
{
    console.log('all category action');
    try {
        var blog = await categoryModel.findById(req.params.id).exec();
        res.send(blog);
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.getSinglecategoryByName = async function(req, res)
{
    console.log('all category action');
    try {
        var category = await categoryModel.findOne({category_name: req.params.categoryname}).populate('author').exec();
        if(category){
            res.status(200).send(category);
        } else {
            res.status(200).send({ message: 'Sorry, We can not found any data from our record!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};


exports.insertcategory = async function(req, res)
{
    console.log(req.body);
    //req.body.author = userId;    
    try {        
        if(req.params.id)
        { 
            var category = new categoryModel(req.body);
            //console.log(blog);
            var result = await category.save();
            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }        
    } catch (error) {
        //console.log(error.code);
        if(error.code == 11000){
            res.status(400).send({ message: 'Please enter unique category name. entered category is exist!' });
        } else {
            res.status(500).send({ message: 'Something went wrong!' });
        }
    }
};

exports.updatecategory = async function(req, res)
{
    console.log("update page action....");
    console.log(req.body);
    try {
        if(req.params.id)
        { 
            const categoryId  = req.params.categoryid;
            var category = await categoryModel.findById(categoryId).exec();
            category.set(req.body);
            var result = await category.save();
            res.send(result);
        } else {
            res.status(401).send({ "code": 401, message: 'You are unauthorized' });
        }
    } catch (error) {
        console.log(error);
        if(error.code == 11000){
            res.status(400).send({ message: 'Please enter unique category name. entered category is exist!' });
        } else {
            res.status(500).send({ message: 'Something went wrong!' });
        }
    }
};

exports.deletecategory = async function(req, res)
{
    console.log('Delete category Action');
    try {
        var result = await categoryModel.deleteOne({ _id: req.params.id }).exec();
        //Remove category from reference table Ex Blog
        var allBlog = await blogModel.find().exec();
        allBlog.map(cat => {
            //console.log(cat.blogcats);
            blogModel.findByIdAndUpdate(cat._id,
                {$pull: {blogcats: req.params.id}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                       // console.log(err);
                    }else{
                        //console.log('Removed From Blog--'+req.params.id);
                    }
                }
            );
        });
        res.status(200).send({ message: 'You are deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};