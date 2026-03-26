const Donor = require('../models/donorSchema.js');
const Student = require('../models/studentSchema.js');

// ---------------- Donor CRUD ----------------

// Create a new donor
const donorCreate = async (req, res) => {
  try {
    const { name, country } = req.body;

    const donor = new Donor({ name, country });
    await donor.save();

    res.status(201).json({
      message: "Donor created successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all donors
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get donor detail by ID
const getDonorDetail = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).populate('studentsSponsored');
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update donor
const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({
      message: "Donor updated successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete donor
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ---------------- Special Query ----------------

// Get all students sponsored by a donor
const getDonorStudents = async (req, res) => {
  try {
    const donorId = req.params.id;

    // Find all students that reference this donor
    const students = await Student.find({ donors: donorId });

    res.status(200).json({
      message: "Students sponsored by donor",
      students,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ---------------- Export ----------------
module.exports = {
  donorCreate,
  getDonors,
  getDonorDetail,
  updateDonor,
  deleteDonor,
  getDonorStudents,
};