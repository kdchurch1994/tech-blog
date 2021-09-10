const router = require('express').Router(); //Imports the use of the express Router functionality
const apiRoutes = require('./api-routes'); //sets all of the api-routes to the const apiRoutes that will be called by router.use to allow us to use the routes
const homeRoutes = require('./home-routes');  //sets all of the home-routes to the const homeRoutes that will be called by router.use to allow us to use the routes
const dashboardRoutes = require('./dashboard-routes'); //sets all of the dashboard-routes to the const dashboardRoutes that will be called by router.use to allow us to use the routes

router.use('/api', apiRoutes); //Alows us to use all the routes in the api directory
router.use('/', homeRoutes); //Allows us to use the routes in the home-routes.js file
router.use('/dashboard', dashboardRoutes); //Allows use to use the routes in dashboard-routes.js file

module.exports = router; //Exports the use of all of the routes in the database
