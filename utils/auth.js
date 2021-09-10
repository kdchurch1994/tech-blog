const withAuth = (req, res, next) => { //creates the withAuth function that checks if a user is logged in before being able to view or create posts. 
    if(!req.session.user_id){ //if they are not logged in, the user is redirected to the login page. 
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;