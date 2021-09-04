const { Model, DataTypes } = require('sequelize'); //Allows us to create the sequelize models
const sequelize = require('../config/connection'); //Imports the connection to the database through sequelize

class Post extends Model {} //Creates the Post model

Post.init( //Configure the fields of the SQL Table post
    {
        id: { //Creates and defines the id column
            type: DataTypes.INTEGER, //Stores the data type as an integer
            allowNull: false, //Does not allow null values
            primaryKey: true, //sets ID as the primary key
            autoIncrement: true //autoIncrements the ID so that whenver a new user is added, their ID is one value higher than the previous person that was added to the database
        },
        title: { //Creates and defines the title column
            type: DataTypes.STRING, //Stores the data type as a string
            allowNull: false //Does not allow null values
        },
        content: { //creates and defines the content column
            type: DataTypes.TEXT, //Stores the data type as Text, which is similar to string but allows for more characters
            allowNull: false //Does not allow null values
        },
        user_id: { //creates and defines the user_id column
            type: DataTypes.INTEGER, //Stores the data type as an integer
            references: { //references the user table and sets user_id as a foreign key using the id primary key from the user table.
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize, //passes in the imported sequelize connection, which is the connection to the tech_blog_db database
        freezeTableName: true, //doesn't allow the pluralize the name of the database table (stops the database from having multiple tables named post)
        underscored: true, //use underscores as opposed to camel-casing
        modelName: 'post' //The name of our model (table) in the database
    }
);

module.exports = Post; //exports the post model