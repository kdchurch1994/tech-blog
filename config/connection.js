const Sequelize = require('sequelize'); //imports sequelize, which in this case is being used to establish a connection to the database

require('dotenv').config(); //Allows us to use the .env file to get the database name, mysql username, and mysql password

let sequelize; //The if statement is being used to determine whether the database in use is JAWSDB or the local mysql database. If it is JAWSDB, it will use the JAWSDB_URL (Heroku Deployment).
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else { //if the connection is local it is using the DB_NAME, DB_USER, and DB_PW info stored in the .env file which include the name of the database and the mysql username and password
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize; //exports the sequelize connection to be used in other files of the codebase. 