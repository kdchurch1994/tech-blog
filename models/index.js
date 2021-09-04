const User = require('./User'); //Imports the use of the User model
const Post = require('./Post'); //Imports the use of the Post model

User.hasMany(Post, { //A user can have many posts; Creates the relationship between the Post and User models using the user_id foreign key 
    foreignKey: 'user_id'
});
Post.belongsTo(User, { //Defines the relationship of the Post model to the user model
    foreignKey: 'user_id', //Imposes the constraint that a post can belong to one user, but not to many users
    onDelete: "cascade" //The link was created using the user_id foreign key
}); //Automatically deletes the child table when a row in the parent table is deleted. 
//In this case, when a user is deleted, the posts associated with their user_id are deleted

module.exports = { User, Post }; //exports the use of the Post and User models by exporting the relationship created by index.js