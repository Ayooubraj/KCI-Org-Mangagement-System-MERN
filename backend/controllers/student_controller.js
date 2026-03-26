const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

// ---------------- Existing functions ----------------
const updateStudent = async (req, res) => { /* unchanged */ };
const updateExamResult = async (req, res) => { /* unchanged */ };
const studentAttendance = async (req, res) => { /* unchanged */ };
const clearAllStudentsAttendanceBySubject = async (req, res) => { /* unchanged */ };
const clearAllStudentsAttendance = async (req, res) => { /* unchanged */ };
const removeStudentAttendanceBySubject = async (req, res) => { /* unchanged */ };
const removeStudentAttendance = async (req, res) => { /* unchanged */ };


// ---------------- New NGO-specific functions ----------------




// Register a new student
const studentRegister = async (req, res) => {
  try {
    const {
      firstname,
      surname,
      studentNumber,
      password,
      sclassName,
      school,
      age,
      gender,
      grade,
      address,
      budget,
      region
    } = req.body;

    // Hash password
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }


    // Create new student
    const student = new Student({
      firstname,
      surname,
      studentNumber,
      password: hashedPassword,
      sclassName,
      school,
      age,
      gender,
      grade,
      address,
      budget,
      region
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully",
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Student login
const studentLogIn = async (req, res) => {
  try {
    const { studentNumber, password } = req.body;

    // Find student by studentNumber
    const student = await Student.findOne({ studentNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // If student has no password set
    if (!student.password) {
      return res.status(400).json({ message: "This student does not have a login account." });
    }

    // If password is provided, compare
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("donors")
      .populate("school");

    res.status(200).json({
      count: students.length,
      students
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};


// Get single student detail by ID
const getStudentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate("donors")
      .populate("school");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};




// Delete single student by ID
const deleteStudent = async (req, res) => {   try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully", student });
  } catch (error) {
    res.status(500).json(error);
  }

};

// Delete all students by school ID
const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params; // school ID
    const result = await Student.deleteMany({ school: id });

    res.status(200).json({
      message: "Students deleted successfully by school",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete all students by class ID
const deleteStudentsByClass = async (req, res) => {
  try {
    const { id } = req.params; // class ID
    const result = await Student.deleteMany({ sclassName: id });

    res.status(200).json({
      message: "Students deleted successfully by class",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json(error);
  }
};








// Assign donor(s) to a student
const assignDonorToStudent = async (req, res) => {
  try {
    const { studentId, donorIds } = req.body; // donorIds = array of donor ObjectIds

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add donors (avoid duplicates)
    student.donors = [...new Set([...student.donors.map(d => d.toString()), ...donorIds])];
    await student.save();

    res.status(200).json({
      message: "Donors assigned successfully",
      student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add material to a student with budget check
const addMaterialToStudent = async (req, res) => {
  try {
    const { studentId, item, cost } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add material
    student.materials.push({ item, cost });

    // Calculate total spent
    const totalSpent = student.materials.reduce((sum, m) => sum + m.cost, 0);

    await student.save();

    let warning = null;
    if (student.budget !== null && totalSpent > student.budget) {
      warning = "Budget limit exceeded!"; //- if budget is null, the check is skipped and no warning is shown. If budget has a number, the warning triggers when exceeded.

}

    res.status(200).json({
      message: "Material added successfully",
      student,
      totalSpent,
      warning,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Search and filter students
const searchStudents = async (req, res) => {
  try {
    const { firstname, studentNumber, surname, address, schoolId, donorId, age, grade, gender, startsWith } = req.query;

    let query = {};

    if (firstname) query.firstname = { $regex: firstname, $options: "i" };
    if (studentNumber) query.studentNumber = studentNumber;
    if (surname) query.surname = { $regex: surname, $options: "i" };
    if (address) query.address = address;
    if (schoolId) query.school = schoolId;
    if (donorId) query.donors = donorId;
    if (age) query.age = age;
    if (grade) query.grade = grade;
    if (gender) query.gender = gender;
    if (startsWith) query.firstname = { $regex: `^${startsWith}`, $options: "i" };

    const students = await Student.find(query).populate("donors").populate("school");

    res.status(200).json({
      count: students.length,   // ✅ number of results
      students
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


// ---------------- Export ----------------
module.exports = {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,

  // New exports
  assignDonorToStudent,
  addMaterialToStudent,
  searchStudents,
};