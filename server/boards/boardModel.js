// Idea Model
// ----------
//
// The Idea model defines the structure of all of the Idea documents created.

var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
    boardName: String,
    caption: String,
    ideas: Array,
    views: { type: Number, default: 0 },
    created_by: { type: String, default: 'anonymous' },
    created_at: { type: Date, default: Date.now },
    delete_flag: { type: Boolean, default: false }
});

module.exports = mongoose.model('Board', BoardSchema);
