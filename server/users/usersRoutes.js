// User Routes
// -----------
//
// The User routes further routes any requests to /api/users in the middleware to specific User methods defined in the User controller.

var userController = require('./usersController.js');

module.exports = function (app) {
 
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
  app.post('/votes', userController.modifyVotes)
  // app.post('/logout', userController.logout);
};
