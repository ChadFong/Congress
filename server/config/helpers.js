// Helper Functions for the Server-Side
// ------------------------------------
//
// These helper utility functions are used for logging and handling errors on the server-side. 
var jwt  = require('jwt-simple');

module.exports = {

  // Log any errors which are passed along from the server.
  logErrors: function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  },

  // Handle any errors which are passed along from the server by sending a 500 status code and the error message back to the client in the response.
  handleErrors: function(err, req, res, next) {
    // Send client the error message.
    res.send(500, {error: err.message});
  },

  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch(error) {
      return next(error);
    }

  }
};
