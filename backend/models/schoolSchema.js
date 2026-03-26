const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  region: {   // changed from district → region
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  }
});

module.exports = mongoose.model("School", schoolSchema);
