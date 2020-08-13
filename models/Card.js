const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
   holder_id: Schema.Types.ObjectId,
   title:{
       type: String,
       required: true
   },
    amount: Number,
    category: String,
    country: String,
    year: Number,
    type: String,
    createdAt: {
       type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('card', CardSchema);