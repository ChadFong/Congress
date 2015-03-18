var glintServices = angular.module('glint.services', []);

glintServices.factory('Votes', function($http){

  // POST
  var updateVotes = function(newVoteCount){
    return $http({
      method: 'POST',
      url: '/api/votes',
      data: newVoteCount
    })
    .then(function(data){return data; })
    .catch(function(error) {
      console.error('updateVotes error', error);
    });
  };
  return {
    updateVotes: updateVotes
  };
});

glintServices.factory('Ideas', function($http){
  var getIdeas = function(){
    return $http({
      method: 'GET',
      url: '/api/ideas'
    }).then(function(response){
      return response.data;
    }).catch(function(error) {
      console.error('getIdeas error', error);
    });
  };

  var createIdea = function(idea){
    return $http({
      method: 'POST',
      url: '/api/ideas',
      data: idea
    }).then(function (response){
      return response.data;
    }).catch(function(error) {
      console.error('createIdeas error', error);
    });
  };

  return {
    getIdeas: getIdeas,
    createIdea: createIdea
  };
});



