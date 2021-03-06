// Idea Model
// ----------
//
// The Idea model defines the structure of all of the Idea documents created.

var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
    title: String,
    text: { type: String, default: '' },
    votes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    created_by: { type: String, default: 'anonymous' },
    created_at: { type: Date, default: Date.now },
    category: { type: String, default: '' },
    tags: [String],
    roles: [String],
    comments: [String],
    delete_flag: { type: Boolean, default: false },
    lastUpVoted: { type: Date, default: "1980-03-25T22:48:19.803Z" },
    lastDownVoted: { type: Date, default: "1980-03-25T22:48:19.803Z" } 
});

module.exports = mongoose.model('Idea', IdeaSchema);
