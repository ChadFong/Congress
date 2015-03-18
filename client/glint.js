var app = angular.module('glint', ['glint.services'])
  .filter('moment', function () {
    return function (dateString) {
        return moment(dateString).fromNow();
    };
  });

app.controller('IdeasCtrl', function (Ideas){
  var self = this;
  self.data = { ideas: [] };
  self.idea = {};
  self.postSuccess = false;

  // display all ideas currently in db
  self.displayIdeas = function(){
    Ideas.getIdeas()
      .then(function (results){
        self.data.ideas = results;
      })
      .catch(function (error){
        console.error('displayIdeas error', error);
      });
  };

  // submit new Idea
  self.submitIdea = function (){
    // escape to handle XSS injection
    _.escape(self.idea.title);
    var idea = JSON.stringify(self.idea);

    // POST new idea, display confirmation, redisplay all ideas
    Ideas.createIdea(idea)
      .then(function (response){
        self.postSuccess = true;
        self.displayIdeas();
      })
      .catch(function (error){
        console.error('createIdea error', error);
      });
  };

  self.displayIdeas();

});

app.controller('VotesCtrl', function(Votes){
  var self = this;

  // call factory db POST function, and handle results
  // options: 
  //   1) doing this updates the number to reflect latest db count
  //      this may be confusing for user who sees the # go up/down lots
  //   2) doing this simply increments only by user added vote, keeping
  //      the results more like what user expects
  self.upvote = function(idea){
    // console.log('upvote');
    voteCount = idea.votes++;
    id = idea._id;
    Votes.updateVotes(voteCount, id) // pass in new vote count
      .then(function (response){
        console.log('upvote success', response);
      })
      .catch(function (error){
        console.error('upvote error', error);
      });
  };

  self.downvote = function(idea){
    // console.log('downvote');
    voteCount = idea.votes--;
    id = idea._id;
    Votes.updateVotes(voteCount, id)
      .then(function (response){
        console.log('downvote success', response);
      })
      .catch(function (error){
        console.error('downvote error', error);
      });
  };

});
