const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  cntnum: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const firstSchema = mongoose.model('Admin Data', schema);
module.exports = firstSchema;
