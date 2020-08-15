const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolderSchema = new Schema({
    name: String,
    surname: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('holder', HolderSchema);