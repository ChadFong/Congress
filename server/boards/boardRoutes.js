var auth = require('./../users/usersController.js');


// Board Routes
// -----------
//
// The Board routes further routes any requests to /api/ideas in the middleware to specific Idea methods defined in the Idea controller.

var boardController = require('./boardController.js');

module.exports = function (app) {
    // Further route from the /api/boards path. A GET will return all of the posted boards from the database. A POST will add a new board to the database.
    app.route('/')
      .get(auth.checkAuth, boardController.allBoards)
      .post(auth.checkAuth, boardController.newBoard);

    app.route('/ideas')
      .get(auth.checkAuth, boardController.boardIdeas)
      .post(auth.checkAuth, boardController.addIdea);

    app.route('/plusView')
      .post(boardController.incrViewCnt);
};
