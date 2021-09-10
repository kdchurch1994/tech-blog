const router = require('express').Router(); //Imports the use of the express Router functionality
const { User, Post, Comment } = require('../../models'); //Imports the use of the User, Post, and Comment models

router.get('/', (req, res) => { //Gets all users from the database
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => { //GET route the retrieves a user based of their ID
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post, 
                attributes: ['id','title', 'created_at']      
        
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','created_at'],
                include: {
                    model: Post,
                    attributes: ['title']

                }
            }
        ] 
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user exists with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => { //Allows us to create a user 
    User.create({
        username: req.body.username,
        email_address: req.body.email_address,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => { //Allows us to login as a user
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'There is no user with this username.' });
                return;
            }

            const passwordValid = dbUserData.checkPassword(req.body.password);

            if (!passwordValid) {
                res.status(400).json({ message: 'Invalid password. Please enter a valid password.' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: "You have successfully logged in." });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/:id', (req, res) => { //Allows us to update a user based on the user ID
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user has this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => { //Allows us to delete a user based of the user id
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user has this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/logout", (req, res) => { //Route the allows us to log out of the site
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.staatus(404).end();
    }
});

module.exports = router; //exports the use of the user routes
