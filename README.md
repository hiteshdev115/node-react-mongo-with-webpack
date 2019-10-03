# node-react-mongo-with-webpack
This project is used React js, node js and database from mongodb and also configure with webpack4

# Quick Start

# Clone the repository
git clone https://github.com/hiteshdev115/node-react-mongo-with-webpack.git

# Go inside the directory
cd node-react-mongo-with-webpack

# Install dependencies
npm install

# You need to install mangoose body parser for connect the database from nodejs to mongodb
npm install express body-parser mongoose --save

# When you complete all above process you need to install mongodb server in your local pc or server.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

sudo apt-get update

sudo apt-get install -y mongodb-org

# After installation of mongoserver you must be start the mongod service using below command
sudo service mongod start

# import your database from this project folder
mongorestore -d <database_name> <directory_backup>
Example:
mongorestore -d restApiDB /var/www/html/node-react-mongo-with-webpack/Database-bkp/restApiDB

# Start development server/Its automatically make build and run the project on your local port
npm start

#Total Library/Module List in this React Project

#ReactDOM
ReactDOM. ... Now, ReactJS is a library to build active User Interfaces thus rendering is one of the integral parts of ReactJS. React provides the developers with a package react-dom a.k.a ReactDOM to access and modify the DOM

#axios 
Axios is a modern and Promise-based JavaScript HTTP client library that can be used both in the browser and the server with Node.js. Axios works asynchronously and allows you to make HTTP calls to REST endpoints and consume JSON REST APIs.

#Link 
Creating a Link Between Pages in React Router. ... React Router's <Link> component fixes that automatically. So, we're going to change List.js so that it contains a React Router link to the Detail page. This means importing Link from React Router, then using it, which is trivial to do.
	Ex:- <Link to={`/users/${user.id}`} activeClassName="active">{user.name}</Link>

#Parse
It converts an HTML string to one or more React elements. There's also an option to replace an element with your own.

#Dateformat
Use for Date format
 	Ex:- {dateFormat(created_at, "mediumDate")}

#MetaTags
For add Meta Tags Globally

#ShowMoreText
Use for display limited line of html content and use for more and less functionality.

#Modal
Use for display Modal
#LazyLoad
For load data on scroll down
#Facebook, Twitter, LinkedIn
Use for Social meioda share
#MDIcon
it is bootstraop icon
#confirmAlert
Conform alert before delete data
#Moment
Also use for date format
#Datatable
it is represent the data using its manner with additional properties like pagination search
#CKEDitor
Html editor


