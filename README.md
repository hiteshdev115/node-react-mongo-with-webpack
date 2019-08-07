# node-react-mongo-with-webpack
This project is used React js, node js and database from mongodb and also configure with webpack4

Quick Start
# Clone the repository
git clone https://github.com/hiteshdev115/node-react-mongo-with-webpack.git

# Go inside the directory
cd node-react-mongo-with-webpack

# Install dependencies
npm install

#You need to install mangoose body parser for connect the database from nodejs to mongodb
npm install express body-parser mongoose --save

#When you complete all above process you need to install mongodb server in your local pc or server.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

sudo apt-get update

sudo apt-get install -y mongodb-org

#After installation of mongoserver you must be start the mongod service using below command
sudo service mongod start

#import your database from this project folder
mongorestore -d <database_name> <directory_backup>
Example:
mongorestore -d restApiDB /var/www/html/node-react-mongo-with-webpack/Database-bkp/restApiDB

# Start development server/Its automatically make buld and run the project on your local port
npm start


