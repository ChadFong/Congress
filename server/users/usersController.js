var User = require('./usersModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  modifyVotes : function (req, res, next) {

    var username = req.body.user;
    var votes = req.body.votes;

    var updateUser = Q.nbind(User.update, User);
    
    updateUser( {username: username}, {$inc : {votes: votes}} )
      .then(function (user) {
        // if (user.votes > 0) {
        //   user.votes = user.votes + modifier;
        //   user.save(function(err){
        //   })
        // } else {
          // no votes
          res.status(401).send();
        })
  },

  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    console.log(password);
    findUser({username: username})
      .then(function (user) {
        console.log(user);
        if (!user) {
          res.status(404).send();
          res.json("user doesn't exist");
        } else {
          return User.methods.comparePasswords(password, user.password, function(err, foundUser){
            if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token, username: username, votes: user.votes});
              } else {
                 res.status(401).send();
              }
          })
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          res.status(401).send() // user already exists
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token, username: username, votes: user.votes});
      })
      .fail(function (error) {
        next(error);
      });
  },
  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      res.send('nice try!')
    } else {
      console.log(token)
      // silly hack -- how do we get username to store?
      var user = jwt.decode(JSON.parse(token).token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            req.body.username = foundUser.username;
            next()
            // res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
