const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true, // will be selected from a dropdown list in the frontend
  },
  // Students sponsored by this donor
  studentsSponsored: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student'
    }
  ]
});

module.exports = mongoose.model("Donor", donorSchema);
