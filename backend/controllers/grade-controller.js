const Grade = require('../models/gradeSchema.js');
const Student = require('../models/studentSchema.js');

// Create grade
const gradeCreate = async (req, res) => {
  try {
    const existing = await Grade.findOne({ gradeName: req.body.gradeName });
    if (existing) {
      return res.status(400).json({ message: "Grade already exists" });
    }

    const grade = new Grade({ gradeName: req.body.gradeName });
    const result = await grade.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all grades
const gradeList = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get grade detail
const getGradeDetail = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ message: "Grade not found" });
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get students by grade
const getGradeStudents = async (req, res) => {
  try {
    const students = await Student.find({ gradeName: req.params.id })
      .populate("school")
      .populate("region");

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { gradeCreate, gradeList, getGradeDetail, getGradeStudents };
