var glintServices = angular.module('glint.services', []);

glintServices.factory('Ideas', function ($http){

  var getIdeas = function (path){
    return $http({
      method: 'GET',
      url: '/api/boards' + path
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getIdeas error', error);
    });
  };

  var createIdea = function (path, idea){
    return $http({
      method: 'POST',
      url: '/api/boards' + path,
      data: idea
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createIdeas error', error);
    });
  };

  return {
    getIdeas: getIdeas,
    createIdea: createIdea
  };
});

glintServices.factory('Votes', function($http){

  var upvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/upvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('upvote error', error);
    });
  };

  var downvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/downvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('downvote error', error);
    });
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
});

glintServices.factory('Auth', function($http){

  var login = function (user){
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('login error', error);
    });  };

    var signup = function (user){
      return $http({
        method: 'POST',
        url: '/api/signup',
        data: user
      })
      .then(function (response){
        return response.data;
      })
      .catch(function (error) {
        console.error('signup error', error);
      });
    };

    var logout = function (user){
      return $http({
        method: 'POST',
        url: '/api/logout'
      })
      .then(function (response){
        return response.data;
      })
      .catch(function (error) {
        console.error('logout error', error);
      });  };

      return {
        login: login,
        signup: signup,
        logout: logout
      };
    });

glintServices.factory('Comments', function ($http){

  var createComment = function (comment){
    return $http({
      method: 'POST',
      url: '/api/comments',
      data: comment
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createComments error', error);
    });

  };

  var getComments = function (idea_id){
    return $http({
      method: 'GET',
      url: '/api/comments',
      data: idea_id
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getComments error', error);
    });
  };

  return {
    createComment: createComment,
    getComments: getComments
  };
});

glintServices.factory('Boards', function ($http){

  var getBoards = function (){
    return $http({
      method: 'GET',
      url: '/api/boards'
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getBoards error', error);
    });
  };

  // var getIdeas = function(){
  //   return $http({
  //     method: 'GET',
  //     url: '/api/boards/ideas'
  //   }).then(function (response){
  //     return response.data;
  //   }).catch(function (error) {
  //     console.error('getBoards error', error);
  //   });
  // };

  var createBoard = function (board){
    return $http({
      method: 'POST',
      url: '/api/boards',
      data: board
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createBoard error', error);
    });
  };

  // var createIdea = function (idea){
  //   return $http({
  //     method: 'POST',
  //     url: '/api/boards/ideas',
  //     data: idea
  //   }).then(function (response){
  //     return response.data;
  //   }).catch(function (error){
  //     console.error('createBoard error', error);
  //   });
  // };

  return {
    getBoards: getBoards,
    // getIdeas: getIdeas,
    createBoard: createBoard,
    // createIdea: createIdea
  };
});
