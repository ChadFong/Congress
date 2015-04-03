var glintServices = angular.module('glint.services', []);

glintServices.factory('localAccess', function () {
  var _username = '';
  var _votes = 0;

  var setUser = function(user) {
    this._username = user;
  };

  var setVotes = function(newVal) {
    this._votes = newVal;
  };

  var getUser = function() {
    return this._username;
  };

  var getVotes = function() {
    return this._votes;
  }

  return {
    setUser: setUser,
    getUser: getUser,
    setVotes: setVotes,
    getVotes: getVotes
  }
});

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

  var upvote = function (path, idea){
    //Group the data to be unpacked on the server.  
    //The path is required for searching the database.
    var groupedData = { 
      path: path,
      idea: idea
    };
    return $http({
      method: 'POST',
      url: '/api/vote/upvote',
      data: groupedData
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('upvote error', error);
    });
  };

  var downvote = function (path, idea){
    //Group the data to be unpacked on the server.  
    //The path is required for searching the database.
    var groupedData = { 
      path: path,
      idea: idea
    };
    return $http({
      method: 'POST',
      url: '/api/vote/downvote',
      data: groupedData
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('downvote error', error);
    });
  };

  var addVotes = function (user, amount) {
    return $http({
      method: 'POST',
      url: '/api/votes',
      data: {user: user, votes: amount}
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error){
      console.error('Buy Votes error', error);
    })
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
});

glintServices.factory('Auth', function($http, $window, $location){

  var signin = function (user){
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      // want to set auth.js's $scope.loginFailure to false
    })
    .error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    // console.log('Error from Auth.signin factory');
    // want to set auth.js's $scope.loginFailure to true
  })
 };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.glint');
  };

    var signup = function (user){
      return $http({
        method: 'POST',
        url: '/api/signup',
        data: user
      })

    };

    var signout = function () {
    $window.localStorage.removeItem('com.glint');
    $location.path('/#/login');
    };


      return {
        signin: signin,
        signup: signup,
        signout: signout,
        isAuth: isAuth
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

  var updateViews = function (boardName){
    return $http({
      method: 'POST',
      url: '/api/boards/plusView',
      data: {'boardName': boardName}
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('addView error', error);
    });
  };

  return {
    getBoards: getBoards,
    createBoard: createBoard,
    updateViews: updateViews
  };
});
