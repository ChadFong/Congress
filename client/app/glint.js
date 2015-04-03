// Glint
// -----
//
// This is our app's main Angular module.

// Our dependencies are by shared services, feature controllers, and third-party modules.
var app = angular.module('glint', [
  'glint.services',
  'glint.boards',
  'glint.ideas',
  'glint.votes',
  'glint.auth',
  'glint.comments',
  'ngAnimate',
  'ngRoute'
  ])
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.glint');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

// Routing configuration. Eventually, this is where the controllers for the specific views will be declared, so they don't have to be referred to in our HTML. (Eg. <varname> instead of AuthCtrl.<varname>)
.config(function($routeProvider, $httpProvider){
	$routeProvider
  .when('/', {
    templateUrl: 'app/boards/boards.html',
    controller: 'AuthCtrl',
    authenticate: true
  })
  .when('/ideas', {
    templateUrl: 'app/ideas/ideas.html',
    authenticate: true

  })
  .when('/login', {
    templateUrl: 'app/auth/login.html'
  })
  .when('/signup', {
    templateUrl: 'app/auth/signup.html'
  })
  .when('/logout', {
    templateUrl: 'app/auth/login.html'
  })
  .otherwise({
    redirectTo: '/login'
  });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})


// Custom filter for applying moment.js to our timestamps.
.filter('moment', function () {
  return function (dateString) {
    return moment(dateString).fromNow();
  };
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    //sleazy hack -- should check with server here
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
})
