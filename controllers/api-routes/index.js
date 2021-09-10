const router = require('express').Router(); //Allows us to use the router functionality of express 
const userRoutes = require('./user-routes'); //sets the user-routes to the const userRoutes that will be called to use the routes defined in the user-routes.js file
const postRoutes = require('./post-routes'); //sets the post-routes to the const postRoutes that will be called to use the routes defined in the post-routes.js file
const commentRoutes = require('./comment-routes'); //sets the comment-routes to the const commentRoutes that will be called to use the routes defined in the comment-routes.js file

router.use('/users', userRoutes); //Calls the userRoutes const to use the routes defined in the user-routes.js
router.use('/posts', postRoutes); //Calls the postRoutes const to use the routes defined in the post-routes.js
router.use('/comments', commentRoutes); //Calls the commentRoutes const to use the routes defined in the comment-routes.js

module.exports = router; //Exports the use of all the api-routes for the Post, Comment, and User models