const { Model, DataTypes } = require('sequelize'); //Allows us to create the sequelize models
const sequelize = require('../config/connection.js'); //Imports the connection to the database through sequelize
const bcrypt = require('bcrypt'); //Imports the use of bcrypt which allows us to hash passwords

//Creat the User model
class User extends Model {
    //check the password each type someone logs in
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

//Configure the fields of the SQL Table user
User.init(
    {
    //Creates and define the id column
        id: {
            type: DataTypes.INTEGER, //Stores the data type as an integer
            allowNull: false, //Does not allow null values
            primaryKey: true, //sets ID as the primary key
            autoIncrement: true //autoIncrements the ID so that whenver a new user is added, their ID is one value higher than the previous person that was added to the database
        },
    //Creates the username column    
        username: {
            type: DataTypes.STRING, //Stores the data type as a string
            allowNull: false, //Does not allow null values
            unique: true //The username must be unique
        },
    //Creates the password column 
        password: { 
            type: DataTypes.STRING, //Stores the data type as a string
            allowNull: false, //Does not allow null values
            validate: {
                len: [4] //The password must be more than 4 characters. Validate is being used to check this
            }
        }
    },
    {//bcrypt hashing passwords that are created 
        hooks: { //The await keyword is used as a prefix to the function that contains the asynchronous function, which will assign the value from the user input to the newUserData's password property
            async beforeCreate(newUserData) {  //the password (newUserData) is then returned to the application with the hashed password 
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            
            async beforeUpdate(updatedUserData) { //The await keyword is used as a prefix to the function that contains the asynchronous function, which will assign the value from the user input to the updatedUserData's password property
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); //the password (updatedUserData) is then returned to the application with the hashed password 
                return updatedUserData;
            }
        },
        
        sequelize, //passes in the imported sequelize connection, which is the connection to the tech_blog_db database

        timestamps: false,

        freezeTableName: true,
        underscored: true, //use underscores as opposed to camel-casing
        modelName: 'user' //The name of our model in the database

    }    
);

module.exports = User; //exports the user model