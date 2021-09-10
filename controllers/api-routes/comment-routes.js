const router = require('express').Router(); //Imports the use of the express Router functionality
const { Comment } = require('../../models'); //Imports the use of the Comment model
const withAuth = require('../../utils/auth') //Allows use to use the withAuth function in the auth file in the utils directory (this ensures that a user as proper authorization to add comments; they must be logged in)

router.get('/', (req, res) => { //route to get all comments
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => { //route to get a particular comment based of the comment id
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => { //Allows us to add a comment to a post
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.put('/:id', withAuth, (req, res) => { //Allows us to update a comment based on the comment id
    Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment matches this id' });
                return;
            }
            res.json(dbCommentData);
        }) .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => { //allows us to delete a comment based of the comment id
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment matches this id.' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router; //Exports the use of comment-routes