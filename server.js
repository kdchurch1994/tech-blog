const express = require('express'); //imports express.js
const app = express(); //sets the const app equal to express(); which will allow us to use the functionalities of express
const sequelize = require('./config/connection'); //imports the sequelize connection configured in the config directory
const path = require('path'); //imports the path functionality node.js
const routes = require('./controllers'); //imports the routes from the controllers directory
const helpers = require('./utils/helpers'); //imports the use of the format-date helper in the utils directory
const exphbs = require('express-handlebars'); //imports the use of express-handlebars
const hbs = exphbs.create({ helpers }); //imports the use of the express helpders
const session = require('express-session'); //imports the use of the express-session, which establishes a session for the user
const PORT = process.env.PORT || 3001; //sets the const PORT to equal the environment variable PORT of the deployment environment (i.e. Heroku) or Port 3001 when deployed locally
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess)); //Allows us to use the created session

app.use(express.json()); //Takes incoming POST data in the form of JSON and parses it into the req.body

app.use(express.urlencoded({ extended: true })); //Takes incoming POST data and converts it to the key/value pairings that can be access in the req.body object

app.use(express.static(path.join(__dirname, 'public'))); //joins the value of __dirname, which represents the directory of the file we execute the code in, with the public workspace

app.engine('handlebars', hbs.engine); //allows use to use handlebars

app.set('view engine', 'handlebars'); //allows us to view the handlebars files as html 

app.use(routes); //allows use to use the routes defined in the controllers directory
 
sequelize.sync({ force: false }).then(() => { //establishes the connection to the database by syncing the models and connecing them to associated database tables, and if those tables aren't found, they will be created
    app.listen(PORT, () => console.log (`Now listening on Port ${PORT}`)) //Tells the app to listen to PORT and provide a console message saying that the server is listening on the port value equal to PORT.
});


