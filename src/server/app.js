const Express = require("express");
const Mongoose = require("mongoose"); 
const BodyParser = require("body-parser");
var multer = require('multer'); //for upload
//var sharp = require('sharp');
//var multerSharp = require('multer-sharp');
//const MongoClient = require("mongodb").MongoClient;
Mongoose.set('useFindAndModify', false);
var app = Express();
var fs = require('fs');



Mongoose.connect("mongodb://localhost:27017/restApiDB", { useNewUrlParser: true }).then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));
Mongoose.set('useCreateIndex', true);

app.use(BodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(BodyParser.urlencoded({ extended: true }));

//const MulterResizer = require('multer-resizer');

var path = require("path"); //for upload
var appRoot = require('app-root-path'); //for get root folder path
//var sharp = require('sharp');

/*For file Upload*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appRoot.path + "/public/images")
    },
    filename: function (req, file, callback) {
        console.log(file);
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, filename)
    }
})

var upload = multer({
    storage: storage
})
/*var images = multer({
  storage: images
});*/
/*End of file Upload*/




var user = require('./routes/userApi'); 
var seo = require('./routes/seoApi'); 
var cmspage = require('./routes/cmspageApi'); 
var blog = require('./routes/blogApi'); 
var category = require('./routes/categoryApi'); 
var services = require('./routes/servicesApi');
var project = require('./routes/projectApi'); 
var login = require('./routes/login');
var contact = require('./routes/contactApi');  
var setting = require('./routes/settingApi'); 



app.post('/api/login', login.login); 
app.post('/api/authuser/', login.loginUserInfo); 
app.post('/api/register', login.register); 

app.post('/api/adduser', user.insertuser); 
app.get('/api/alluser', user.getallUser);
app.get("/api/user/:id", user.getUser);
app.put("/api/updateUser/:id", user.updateUser);
app.delete("/api/deleteUser/:id", user.deleteUser);

app.post("/api/user/:id/addNewCars", user.newUserCar);
app.get('/api/car/user/:id', user.getUserCar);


app.get('/api/allcmspage', cmspage.getallpages); 
app.post('/api/:id/addcmspage', cmspage.insertpage); 
app.put('/api/:id/updatecmspage/:pageid', cmspage.updatepage); 
app.delete("/api/deletepage/:id/user/:userId", cmspage.deletepage);

app.get('/api/allblog', blog.getallblog); 
app.get('/api/getSingleblog/:id', blog.getSingleblog); 
app.get('/api/blog/getRandomBlog/:blogname', blog.getRandomblog); 
app.get('/api/blog/searchbycategory/:categoryname', blog.getSearchByCatName); 
app.get('/api/getSingleBlogByName/:blogname', blog.getSingleblogByName); 
app.post('/api/:id/addblog', upload.single('blogimage'), blog.insertblog); 
app.post('/api/:id/addblogwithoutimage', upload.single('blogimage'), blog.insertblog);//For Add without image
app.put('/api/:id/editblog/:blogid', upload.single('blogimage'), blog.updateblog); //For Edit without image
app.put('/api/:id/updateblog/:blogid', upload.single('blogimage'), blog.updateblog); 
app.delete("/api/deleteblog/:id/user/:userId", blog.deleteblog);
app.post("/api/removethumb/", blog.removeThumb);
app.get('/api/getLastThreeBlog', blog.getLastThreeBlog); 


app.get('/api/allservices', services.getallservices); 
app.get('/api/getSingleService/:id', services.getSingleservice); 
app.get('/api/blog/getRandomService/:servicesname', services.getRandomservice); 
app.get('/api/getSingleServiceByName/:servicesname', services.getSingleserviceByName); 
app.post('/api/:id/addservice', upload.single('serviceimage'), services.insertservice); 
app.post('/api/:id/addservicewithoutimage', upload.single('serviceimage'), services.insertservice); //For Add without image
app.put('/api/:id/editservice/:serviceid', upload.single('serviceimage'), services.updateservice); //For Edit without image
app.put('/api/:id/updateservice/:serviceid', upload.single('serviceimage'), services.updateservice); 
app.delete("/api/deleteservice/:id/user/:userId", services.deleteservice);
app.post("/api/service/removethumb/", services.removeThumb);

app.get('/api/getsetting', setting.getSetting); 
app.post('/api/savesetting', upload.single('logoimage'), setting.insertSetting); 
app.post('/api/updatesetting/', upload.single('logoimage'), setting.updateSetting); 
app.post("/api/removelogo/", setting.removeLogo);

app.post("/api/contactus/", contact.insertContact);
app.get("/api/allContact/", contact.allContact);
app.delete("/api/deletecontact/:id", contact.deletecontact);


app.get('/api/allseo', seo.getallseo); 
app.get('/api/getSingleseo/:id', seo.getSingleseo); 
app.post('/api/:id/addseo', seo.insertseo); 
app.put('/api/:id/updateseo/:seoid', seo.updateseo); 
app.delete("/api/deleteseo/:id/user/:userId", seo.deleteseo);
app.get('/api/getSingleSeoByName/:pageUrl', seo.getSingleSeoByName); 

app.get('/api/allproject', project.getallproject); 
app.get('/api/getSingleproject/:id', project.getSingleproject); 
app.get('/api/getSingleProjectByName/:slug', project.getSingleprojectByName); 
app.post('/api/:id/addproject', upload.single('projectimage'), project.insertproject); 
app.post('/api/:id/addprojectwithoutimage', upload.single('projectimage'), project.insertproject);//For Add without image
app.put('/api/:id/editproject/:projectid', upload.single('projectimage'), project.updateproject); //For Edit without image
app.put('/api/:id/updateproject/:projectid', upload.single('projectimage'), project.updateproject); 
app.delete("/api/deleteproject/:id/user/:userId", project.deleteproject);
app.post("/api/project/removethumb/", project.removeThumb);
app.get('/api/getLastSixproject', project.getLastSixProject); 

app.get('/api/allcategory', category.getallcategory); 
app.get('/api/getSinglecategory/:id', category.getSinglecategory); 
app.get('/api/getSingleCategoryByName/:categoryname', category.getSinglecategoryByName); 
app.post('/api/:id/addcategory/', category.insertcategory); 
app.put('/api/:id/updatecategory/:categoryid', category.updatecategory);
app.delete("/api/deletecategory/:id/user/:userId", category.deletecategory);

app.set('port', process.env.PORT || 3001);
/*app.listen(8080, () => {
    console.log("Listening at :- "+process.env.PORT);
});*/
app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}!`));