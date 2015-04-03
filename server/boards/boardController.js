// Board Controller
// ---------------
//
// The idea controller handles requests passed from the idea router.

// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
var Board = require('./boardModel.js');
var Idea = require('../ideas/ideaModel.js');
var querystring = require('querystring');

module.exports = {

  // Retrieve all of the boards that exist in the MongoDB database.
  allBoards: function(req, res, next) {
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findAllBoards = Q.nbind(Board.find, Board);
    
    findAllBoards({})
      .then(function(boards) {
        res.status(200);
        res.json(boards);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new Board to the MongoDB database.
  newBoard: function(req, res, next) {

    // Bind the Mongoose create method to the Board model, so that the Q module can use promises with it.
    var createBoard = Q.nbind(Board.create, Board);

    // Create a new document from the Board model. If successfully created then the new Board document is returned.
    var newBoard = {
      boardName: req.body.boardName,
      caption: req.body.caption,
      created_by: req.body.username,
      ideas: []
    };

    createBoard(newBoard)
      .then(function (createdBoard) {
        if (createdBoard) {
            console.log(createdBoard);
            res.json(createdBoard);
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Retrieve all of the ideas that exist in the MongoDB database for current board.
  boardIdeas: function(req, res, next) {
    // Determine the board we are pulling from
    var boardName = querystring.unescape(req._parsedUrl.query);
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findBoard = Q.nbind(Board.find, Board);
    
    findBoard({ boardName: boardName })
      .then(function(board) {
        res.json(board[0].ideas);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new idea to the MongoDB database.
  addIdea: function(req, res, next) {
    // Determine the board we are adding to.
    var boardName = querystring.unescape(req._parsedUrl.query);

    // Bind the Mongoose create method to the Idea model, so that the Q module can use promises with it.
    var createIdea = Q.nbind(Idea.create, Idea);
    var findBoard = Q.nbind(Board.find, Board);

    // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
    var newIdea = {
      title: req.body.title,
      text: req.body.text,
      created_by: req.body.username
    };


    createIdea(newIdea)
      .then(function (createdIdea) {
        if (createdIdea) {
            findBoard({ boardName: boardName})
              .then(function(board) {
                board[0].ideas.push(createdIdea);
                return board;
              })
              .then(function(modifiedBoard){
                modifiedBoard[0].save();
                res.json(modifiedBoard[0].ideas);
              })
              .fail(function(error) {
                next(error);
              });
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  incrViewCnt: function (req, res, next){
    var findBoard = Q.nbind(Board.find, Board);
    var boardName = req.body.boardName;
    
    findBoard({ boardName: boardName })
      .then(function(board) {
        board[0].views++;
        return board;
      })
      .then(function(incrBoard){
        incrBoard[0].save();
      })
      .fail(function(error) {
        next(error);
      });
  }

};
