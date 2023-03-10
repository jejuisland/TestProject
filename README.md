<!-- THIS IS FOR EXAMINATION ONLY -->

<!-- IMS Home Phone Subscriber Service -->

## run the creation of Database and table Subscriber first
SQL file for local setup / QueryForLocalDBCreation.sql
copy and run the query to you MySQL Workbench
## run npm install
npm i
## create a .env file and insert the following:
PORT = 3000
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="ims_db"
DB_PORT=3307
DATABASE_URL="mysql://root:root@localhost:3307/ims_db"

## then run this command into your terminal:
node app..js

## or if you installed nodemon
nodemon app.js

## then access the swagger for API documentation and testing
http://localhost:3000/ims/docs

## JERALD VAILOCES