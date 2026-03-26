const Region = require('../models/regionSchema.js');

// Create Region
exports.regionCreate = async (req, res) => {
  try {
    const region = new Region({ name: req.body.name });
    await region.save();
    res.status(201).json(region);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all regions
exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
