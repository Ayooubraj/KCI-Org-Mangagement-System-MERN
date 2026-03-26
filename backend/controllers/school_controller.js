const School = require('../models/schoolSchema.js');

// Create School
exports.schoolCreate = async (req, res) => {
  try {
    const school = new School({
      name: req.body.name,
      address: req.body.address,
      region: req.body.region   // expects Region ObjectId
    });
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all schools
exports.getSchools = async (req, res) => {
  try {
    const schools = await School.find().populate('region');
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};