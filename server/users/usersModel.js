// User Model
// ----------
//
// The User model defines the structure of all of the User documents created.

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  votes: {
    type: Number,
    default: 100
  }
});

var User = mongoose.model('users', UserSchema);
User.methods = {};
User.methods.comparePasswords = function(candidatePassword, savedPassword, cb) {
  console.log('usersModel: 25', savedPassword);
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch){
    if (err) {
      console.log('login error');
      console.error(err);
    } else {
      cb(null, isMatch);
    }
  });
};

UserSchema.pre('save', function(next){
  var that = this;

  bcrypt.hash(this.password, null, null, function(err, hash){
    if (err) {
      return next(err);
    } else {
      that.password = hash;
      next();
    }
  });
});

module.exports = User;
