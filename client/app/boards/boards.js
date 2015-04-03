// Boards controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="BoardsCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that. 
angular.module('glint.boards', [])
.controller('BoardsCtrl', function (Boards, $filter, $location){
  var self = this;
  self.data = { boards: [] };
  self.board = {};
  self.postSuccess = false;
  self.submitted = false;

  // Display all boards currently in the database.
  self.displayBoards = function(){
    Boards.getBoards()
      .then(function (results){
        results = $filter('orderBy')(results, 'views', true);
        self.data.boards = results;
      })
      .catch(function (error){
        console.error('displayBoards error', error);
      });
  };

  // Submit a new board.
  self.submitBoard = function ($timeout){

    // Show description box.
    if (self.submitted === false){
      self.submitted = true;
    } else {

    // Escape user input.
    var username = JSON.parse(window.localStorage['com.glint']).username;
    self.board.boardName = _.escape(self.board.boardName);
    self.board.caption = _.escape(self.board.caption);
    self.board.username = _.escape(username);
    var board = JSON.stringify(self.board);
    
    // POST new board, display confirmation, redisplay all boards.
    Boards.createBoard(board)
      .then(function (response){
        // Show user feedback.
        self.postSuccess = true;
        // Hide idea description field.
        self.submitted = false;
        // Clear form fields after submit.
        self.board = {};
        self.displayBoards();
      })
      .catch(function (error){
        console.error('createBoard error', error);
      });
    }
  };

  self.loadIdeas = function (board){
    Boards.updateViews(board.boardName);
    $location.path('/ideas').search(board.boardName);
  };

  self.displayBoards();
});
