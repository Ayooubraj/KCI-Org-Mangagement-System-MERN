const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  studentNumber: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },

  // Relationships
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
   region: {   // changed from district → region
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },


  donors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor'
    }
  ],

  role: {
    type: String,
    default: "Student"
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  grade: {
    type: String
  },
  address: {
    type: String
  },

  examResult: [
    {
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      },
      marksObtained: {
        type: Number,
        default: 0
      }
    }
  ],

  attendance: [
    {
      date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
      },
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
      }
    }
  ],

  photos: [
    {
      type: String
    }
  ],
  budget: {
    type: Number,
    default: null
  },

  materials: [
    {
      item: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);