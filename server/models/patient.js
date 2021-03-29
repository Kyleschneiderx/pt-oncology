const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  DOB: {
    type: Date,
    required: false
  },
  date_of_diagnosis: {
    type: Date,
    required: false
  },
  doctor: {
    type: String,
    required: false
  },
  diagnosis: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'I am new!'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ]
},
{ timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
