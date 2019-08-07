var jwt = require('jsonwebtoken');
var appRoot = require('app-root-path');
var fs = require('fs');
var userModel = require('../models/user');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);


exports.login = async function(req, res)
{
    console.log('In login API===>'+req.body.username);
    
    await userModel.findOne({
      username: req.body.username,
      password: req.body.password
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        //console.log('===UserData===>'+user);
        var token = jwt.sign(user.toJSON(), settings.secret);
        // return the information including token as JSON
        res.json({success: true, userData : JSON.stringify(user), token: 'JWT ' + token});
      }
    });
};


exports.register = async function(req, res)
{
    //console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new userModel(req.body);
       
        // save the user
        await newUser.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      }
};