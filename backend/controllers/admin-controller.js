const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');
const Donor = require('../models/donorSchema.js');


const adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
} catch (error) {
  console.error("Error in adminRegister:", error.message);   // log message
  console.error(error.stack);                                // log stack trace
  res.status(500).json({ message: "Internal Server Error", details: error.message });
}
};

const adminLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                const validated = await bcrypt.compare(req.body.password, admin.password);
                if (validated) {
                    admin.password = undefined;
                    res.send(admin);
                } else {
                    res.send({ message: "Invalid password" });
                }
            } else {
                res.send({ message: "User not found" });
            }
        } else {
            res.send({ message: "Email and password are required" });
        }
} catch (error) {
  console.error("Error in adminLogIn:", error.message);   // log message
  console.error(error.stack);                                // log stack trace
  res.status(500).json({ message: "Internal Server Error", details: error.message });
}

};



const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
} catch (error) {
  console.error("Error in getAdminDetail:", error.message);   // log message
  console.error(error.stack);                                // log stack trace
  res.status(500).json({ message: "Internal Server Error", details: error.message });
}

}

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);

    await Sclass.deleteMany({ school: req.params.id });
    await Student.deleteMany({ school: req.params.id });
    await Teacher.deleteMany({ school: req.params.id });
    await Subject.deleteMany({ school: req.params.id });
    await Notice.deleteMany({ school: req.params.id });
    await Complain.deleteMany({ school: req.params.id });

    res.send(result);
  } catch (error) {
    console.error("Error in deleteAdmin:", error.message);   // log message
    console.error(error.stack);                                // log stack trace
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
};


const updateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Admin.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
} catch (error) {
  console.error("Error in updateAdmin:", error.message);   // log message
  console.error(error.stack);                                // log stack trace
  res.status(500).json({ message: "Internal Server Error", details: error.message });
}


}


// List all students (Admin view)
const listStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("donors")
      .populate("school")
      .populate("region");
    res.status(200).json({ count: students.length, students });
  } catch (error) {
    console.error("Error in listStudents:", error.message);   // log message
    console.error(error.stack);                                // log stack trace
    res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
};

// List all donors (Admin view)
const listDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("students");
    res.status(200).json({ count: donors.length, donors });
} catch (error) {
  console.error("Error in listDonors:", error.message);   // log message
  console.error(error.stack);                                // log stack trace
  res.status(500).json({ message: "Internal Server Error", details: error.message });
}
};


module.exports = { 
    adminRegister,
    adminLogIn,
    getAdminDetail, 
    deleteAdmin, 
    updateAdmin,
    listStudents,
    listDonors 
};


