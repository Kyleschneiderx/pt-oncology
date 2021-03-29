const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    Question: {
      type: String,
      required: true
    },
    Answer: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Question', questionSchema);