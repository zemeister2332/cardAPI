const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
   holder_id: Schema.Types.ObjectId,
   title:{
       type: String,
       required: true
   },
    category: String,
    country: String,
    year: Number,
    type: String

});

module.exports = mongoose.model('card', CardSchema);