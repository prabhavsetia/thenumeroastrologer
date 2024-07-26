const mongoose = require('mongoose');
const { Schema } = mongoose;

const MasterUserSchema = new mongoose.Schema({
    name: {
        type: String ,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },

  });
  const User = mongoose.model('user',MasterUserSchema);
  module.exports = User;