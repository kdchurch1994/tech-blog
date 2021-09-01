const express = require('express'); //imports express.js
const app = express(); //sets the const app equal to express(); which will allow us to use the functionalities of express
const sequelize = require('./config/connection'); //imports the sequelize connection configured in the config directory
const path = require('path'); //imports the path functionality node.js

const PORT = process.env.PORT || 3001; //sets the const PORT to equal the environment variable PORT of the deployment environment (i.e. Heroku) or Port 3001 when deployed locally

app.use(express.json()); //Takes incoming POST data in the form of JSON and parses it into the req.body

app.use(express.urlencoded({ extended: true })); //Takes incoming POST data and converts it to the key/value pairings that can be access in the req.body object

app.use(express.static(path.join(__dirname, 'public'))); //joins the value of __dirname, which represents the directory of the file we execute the code in, with the public workspace

sequelize.sync({ force: false }).then(() => { //establishes the connection to the database by syncing the models and connecing them to associated database tables, and if those tables aren't found, they will be created
    app.listen(PORT, () => console.log (`Now listening on Port ${PORT}`)) //Tells the app to listen to PORT and provide a console message saying that the server is listening on the port value equal to PORT.
});


