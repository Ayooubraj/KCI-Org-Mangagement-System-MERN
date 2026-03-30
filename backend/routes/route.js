const router = require('express').Router();

const { 
  adminRegister, 
  adminLogIn, 
  deleteAdmin, 
  getAdminDetail, 
  updateAdmin,
  listStudents,
  listDonors
} = require('../controllers/admin-controller.js');

const { 
  sclassCreate, 
  sclassList, 
  deleteSclass, 
  deleteSclasses, 
  getSclassDetail, 
  getSclassStudents 
} = require('../controllers/class-controller.js');

const { complainCreate, complainList } = require('../controllers/complain-controller.js');

const { 
  noticeCreate, 
  noticeList, 
  deleteNotices, 
  deleteNotice, 
  updateNotice 
} = require('../controllers/notice-controller.js');

const {
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
  assignDonorToStudent,   // ✅ make sure exported in student_controller.js
  addMaterialToStudent,
  searchStudents,    // ✅ make sure exported in student_controller.js
} = require('../controllers/student_controller.js');

const { 
  subjectCreate, 
  classSubjects, 
  deleteSubjectsByClass, 
  getSubjectDetail, 
  deleteSubject, 
  freeSubjectList, 
  allSubjects, 
  deleteSubjects 
} = require('../controllers/subject-controller.js');

const { 
  teacherRegister, 
  teacherLogIn, 
  getTeachers, 
  getTeacherDetail, 
  deleteTeachers, 
  deleteTeachersByClass, 
  deleteTeacher, 
  updateTeacherSubject, 
  teacherAttendance 
} = require('../controllers/teacher-controller.js');

const { 
  donorCreate, 
  getDonors, 
  getDonorDetail, 
  updateDonor, 
  deleteDonor, 
  getDonorStudents 
} = require('../controllers/donor_controller.js');

const { regionCreate, getRegions } = require('../controllers/region_controller.js');
const { schoolCreate, getSchools } = require('../controllers/school_controller.js');


// ---------------- Admin ----------------
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail);
router.delete("/Admin/:id", deleteAdmin);
router.put("/Admin/:id", updateAdmin);


// listing rotes for admin
router.get("/AdminStudents", listStudents);
router.get("/AdminDonors", listDonors);




// ---------------- Student ----------------
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);

router.get("/Students", getStudents);
router.get("/Student/:id", getStudentDetail);

router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);

router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

// Search & filter students
router.get('/SearchStudents', searchStudents);


// 🔹 New NGO-specific routes
router.put('/AssignDonor', assignDonorToStudent);   // expects { studentId, donorIds }
router.put('/AddMaterial', addMaterialToStudent);   // expects { studentId, item, cost }


// ---------------- Teacher ----------------
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);

router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);

router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);

router.put("/TeacherSubject", updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);

// ---------------- Notice ----------------
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

// ---------------- Complain ----------------
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

// ---------------- Sclass ----------------
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// ---------------- Subject ----------------
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

// Donor
router.post('/DonorCreate', donorCreate);
router.get('/Donors', getDonors);
router.get('/Donor/:id', getDonorDetail);
router.put('/Donor/:id', updateDonor);
router.delete('/Donor/:id', deleteDonor);
router.get('/DonorStudents/:id', getDonorStudents);


// Region
router.post('/RegionCreate', regionCreate);
router.get('/Regions', getRegions);

// School
router.post('/SchoolCreate', schoolCreate);
router.get('/Schools', getSchools);




module.exports = router;
