const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NoteSchema = new Schema({
    note: String
})

module.exports = mongoose.model('Note', NoteSchema);