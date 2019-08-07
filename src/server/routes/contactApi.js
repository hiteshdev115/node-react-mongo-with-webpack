var appRoot = require('app-root-path');
var contactModel = require('../models/contactus');
var nodemailer = require('nodemailer');

exports.insertContact = async function(req, res)
{
    console.log("Contact us action");
    //console.log(req.body);
    try {
        var contactus = new contactModel(req.body);
        var result = await contactus.save();
        
        const htmlEmailUser = `<div style="width:600px; margin-right:auto; margin-left:auto; background-color:#e7dede; padding-right:10px; padding-left:10px; padding-top:20px;padding-bottom:20px;">
        <p><h3>Hi ${req.body.customername},</h3></p>
        <p>&nbsp;</p>
        <p>Thank you for choosing us. We are really appreciate and we will get back to you in shortly.</p>
        <p>If you need more help and any question you can feel free to call us on our below contact details:</p>
        <ul>
            <li>Email : support@cleversamurai.com</li>
            <li>Call : 1.905.275.2220</li>
            <li>Call : 1.866.875.2220</li>
        </ul>
        </div>
        `;

        const htmlEmailAdmin = `<div style="width:600px; margin-right:auto; margin-left:auto; background-color:#e7dede;padding-right:10px; padding-left:10px;padding-top:20px;padding-bottom:20px;">
        <h3 style="text-align:center;">Contact Details</h3>
        <p>Below is the customer detals who is try to contact you from web site contact us page.</p>
        <ul>
            <li>Name : ${req.body.customername}</li>
            <li>Email : ${req.body.email}</li>
            <li>Subject : ${req.body.subject}</li>
            <li>Message : ${req.body.message}</li>
        </ul></div>
        `;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
              user: "skye.cleversamurai@gmail.com",
              pass: "Cleversam"
            }
          });

          let mailoptionsTo = {
              from : 'skye.cleversamurai@gmail.com',
              to : req.body.email,
              subject : "Thank you for contacting us - Cleversamurai",
              html: htmlEmailUser
          }

          let mailoptionsAdmin = {
            from : 'skye.cleversamurai@gmail.com',
            to : 'hk.121988@gmail.com',
            subject : req.body.subject,
            html: htmlEmailAdmin
        }

          /*To Email*/
          transporter.sendMail(mailoptionsAdmin, (err, info) => {
              if(err){
                  return console.log(err);
              }
              console.log('Message has been sent!');
          })
          /* Admin Email */
          transporter.sendMail(mailoptionsTo, (err, info) => {
            if(err){
                return console.log(err);
            }
            console.log('Message has been sent! %s', info.message);
        })
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong!' });
    }
};


exports.allContact = async function(req, res)
{
    console.log('all contact action');
    try {
        var result = await contactModel.find().exec();
        if(result == '')
        {
            res.status(200).send({ message: 'Sorry, No data found!' });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({ message: 'No data found!' });
    }
};

exports.deletecontact = async function(req, res)
{
    console.log('contact delete'); 
    try {
        var result = await contactModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: 'You are deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!!' });
    }
};


