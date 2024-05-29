
function isAuthenticated(req, res, next) {
    if (req.session.user) {
      // if User is authenticated, proceed to the next middleware or route handler
       return  next();
    }
  
    // User is not authenticated, redirect them to the login page
    res.redirect('/auth/login');
  }


  module.exports = isAuthenticated;