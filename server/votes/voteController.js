// Vote Controller
// ---------------
//
// The vote controller handles requests passed from the vote router.

var Q = require('q');
var Idea = require('../ideas/ideaModel.js');
var User = require('../users/usersModel.js')
var Board = require('../boards/boardModel.js');
var querystring = require('querystring');

module.exports = {

  // Add one to the vote count for a given idea.
  upvote: function(req, res, next) {
    // console.log(req.body.username)
    // updateVoteCount(req, res, 1, 'up');

    var findUser = Q.nbind(User.findOne, User);
    findUser( {username: req.body.username} )
    .then(function (user) {
      if (user.votes > 0) {
        var newVotes = user.votes - 1;

        User.update({username: user.username}, {$set: {votes: newVotes}}, function(err){
          updateVoteCount(req, res, 1, 'up');
        });
      } else {
          // no votes
          res.status(401).send();
        } 
      })
  },

  // Subtract one from the vote count for a given idea.
  downvote: function(req, res, next) {
    var findUser = Q.nbind(User.findOne, User);
    findUser( {username: req.body.username} )
    .then(function (user) {
      if (user.votes > 0) {
        var newVotes = user.votes - 1;

        User.update({username: user.username}, {$set: {votes: newVotes}}, function(err){
          updateVoteCount(req, res, -1, 'down');
        });
      } else {
        res.status(401).send()
      } 
    })
  }
};


// Update the vote count for an idea.
// Add up or down vote indications.
var updateVoteCount = function(req, res, changeValue, direction) {
  // Split the path to get the board name 
  var boardName = querystring.unescape(req.body.path);
  var bn = boardName.split('?')
  boardName = bn[bn.length-1];
  
  var updateBoard = Q.nbind(Board.update, Board);  
  
  var targetIdea = JSON.parse(req.body.idea);
  console.log("this is the target Idea" , targetIdea);

  // Get the date and set when an idea was upvoted or downvoted.
  var dateTime = Date();

  var voteTime;
  if (direction === 'up'){
    voteTime = {"ideas.$.lastUpVoted" : dateTime};
  };
  if (direction === 'down'){
    voteTime = {"ideas.$.lastDownVoted" : dateTime};
  };

  // Query the board, the query the title.
  updateBoard({ 'boardName' : boardName, 'ideas.title': targetIdea.title}, { $inc : { "ideas.$.votes" : changeValue }, $set :voteTime } )
  .then(function (board){
    res.send(board);
  })
  .fail(function (err) {
    console.log(err);
    next(err);
  });  

};

// var updateUser = function(req, res, changeValue) {
//     var
// }
