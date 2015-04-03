var auth = require('./../users/usersController.js');

// Idea Routes
// -----------
//
// The Idea routes further routes any requests to /api/ideas in the middleware to specific Idea methods defined in the Idea controller.

var ideaController = require('./ideaController.js');

module.exports = function (app) {
    // Further route from the /api/ideas path. A GET will return all of the posted ideas from the database. A POST will add a new idea to the database.
    app.route('/')
      .get(auth.checkAuth, ideaController.allIdeas)
      .post(auth.checkAuth, ideaController.newIdea);
};
