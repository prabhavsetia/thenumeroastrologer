const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String ,
        require: true
    },
    subtitle:{
        type: String,
        default: "General"
    },
    description:{
        type: String,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now
    },

  });
  module.exports = mongoose.model('blog',BlogSchema);