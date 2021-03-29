const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  token: {
    type: String,
    required: false
  },
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ]
});


userSchema.statics.findByToken = function(token, cb){
  var user = this;

  jwt.verify(token, 'supersecretcode', function(err, decode){
      user.findOne({"_id": decode, "token": token}, function(err, user){
          if(err) return cb(err);
          cb(null,user);
      })
  })
}

module.exports = mongoose.model('User', userSchema);
