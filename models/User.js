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
    //Create and define the id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        
        sequelize,

        timestamps: false,

        freezeTableName: true,
        underscored: true,
        modelName: 'user'

    }    
);

module.exports = User;