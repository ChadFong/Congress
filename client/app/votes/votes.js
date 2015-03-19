angular.module('glint.votes', [])

.controller('VotesCtrl', function(Votes){
  var self = this;

  // call factory db POST function, and handle results
  // options: 
  //   1) doing this updates the number to reflect latest db count
  //      this may be confusing for user who sees the # go up/down lots
  //   2) doing this simply increments only by user added vote, keeping
  //      the results more like what user expects
  self.upvote = function(idea){
    // console.log('upvote');
    // voteCount = idea.votes++;
    // id = idea._id;

    idea = JSON.stringify(idea);
    Votes.upvote(idea)
      .then(function (response){
        console.log('upvote success', response);
        // update the specific idea
      })
      .catch(function (error){
        console.error('upvote error', error);
      });
  };

  self.downvote = function(idea){
    // console.log('downvote');
    // voteCount = idea.votes--;
    // id = idea._id;

    idea = JSON.stringify(idea);
    Votes.downvote(idea)
      .then(function (response){
        console.log('downvote success', response);
        // update the specific idea
      })
      .catch(function (error){
        console.error('downvote error', error);
      });
  };
});
