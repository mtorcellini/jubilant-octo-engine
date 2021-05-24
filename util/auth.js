const withAuth = (req, res, next) => {
  // check for loggedIn session variable
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = withAuth;