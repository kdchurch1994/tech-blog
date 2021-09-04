const User = require('./User'); //Imports the use of the User model
const Post = require('./Post'); //Imports the use of the Post model
const Comment = require('./Comment');

User.hasMany(Post, { //A user can have many posts; Creates the relationship between the Post and User models using the user_id foreign key 
    foreignKey: 'user_id'
});

Post.belongsTo(User, { //Defines the relationship of the Post model to the user model
    foreignKey: 'user_id', //Imposes the constraint that a post can belong to one user, but not to many users
    onDelete: "cascade" //The link was created using the user_id foreign key
}); //Automatically deletes the child table when a row in the parent table is deleted. 
//In this case, when a user is deleted, the posts associated with their user_id are deleted

Comment.belongsTo(User, { //Defines the relationship of the Comment model to the User model
    foreignKey: 'user_id', //Imposes the constraint that a comment can belong to one user, but not to many users
    onDelete: "cascade" //The link was created using the user_id foreign key
}); //Automatically deletes the child table when a row in the parent table is deleted. 
//In this case, when a user is deleted, the comments associated with their user_id are deleted

Comment.belongsTo(Post, { //Defines the relationship of the Comment model to the Post model
    foreignKey: 'post_id', //Imposes the constraint that a comment can belong to one Post, but not to many Posts
    onDelete: "cascade" //The link was created using the post_id foreign key
}); //Automatically deletes the child table when a row in the parent table is deleted. 
//In this case, when a post is deleted, the comments associated with their post_id are deleted

User.hasMany(Comment, { //A user can have many comments; Creates the relationship between the Comment and User models using the user_id foreign key 
    foreignKey: 'user_id',
});

Post.hasMany(Comment, { //A post can have many comments; Creates the relationship between the Post and Comment models using the post_id foreign key 
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment }; //exports the use of the Post, User, and Comment models by exporting the relationship created by index.js