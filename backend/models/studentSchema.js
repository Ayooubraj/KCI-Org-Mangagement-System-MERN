const mongoose = require("mongoose");

const siblingSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    grade: String,
    school: String,
  },
  { _id: false }
);

const promisesSchema = new mongoose.Schema(
  {
    studyHard: { type: Boolean, default: false },
    writeLetters: { type: Boolean, default: false },
    volunteer: { type: Boolean, default: false },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    // =====================
    // BASIC INFORMATION
    // =====================
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    studentNumber: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, default: "Student" },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: Date,
    age: Number,
    phone: String,
    province: String,
    district: String,
    address: String,
    currentAddress: String,

    // =====================
    // SCHOOL RELATIONSHIP
    // =====================
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true },
    sclassName: { type: mongoose.Schema.Types.ObjectId, ref: "sclass", required: true },
    grade: String,

    // =====================
    // PARENT INFORMATION
    // =====================
    maritalStatus: { type: String, enum: ["Married","Separated","Widowed","Single Parent"] },
    fatherName: String,
    fatherDob: Date,
    fatherAge: Number,
    fatherOccupation: String,
    fatherHealth: { type: String, enum: ["Healthy","Fair","Poor","Disabled"] },
    fatherHealthSpecify: String,
    motherName: String,
    motherDob: Date,
    motherAge: Number,
    motherOccupation: String,
    motherHealth: { type: String, enum: ["Healthy","Fair","Poor","Disabled"] },
    motherHealthSpecify: String,
    remarks: String,

    // =====================
    // SIBLINGS
    // =====================
    siblings: [siblingSchema],

    // =====================
    // GUARDIAN
    // =====================
    guardianName: String,
    guardianDob: Date,
    guardianAge: Number,
    guardianRelation: String,
    guardianOccupation: String,
    guardianHealth: { type: String, enum: ["Healthy","Fair","Poor","Disabled"] },
    guardianHealthSpecify: String,
    guardianRemarks: String,

    // =====================
    // PHOTOS
    // =====================
    profilePic: String,
    studentPic: String,
    familyPhoto: String,
    housePhoto: String,

    // =====================
    // DONORS
    // =====================
    donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donor" }],

    // =====================
    // ACADEMIC
    // =====================
    studyStatus: String,
    schoolName: String,
    studentId: String,
    clothingSize: String,
    academicResult: String,
    achievements: String,
    challenges: String,
    distance: String,
    academicRemarks: String,

    // =====================
    // FINANCIAL
    // =====================
    houseBelong: String,
    houseSize: String,
    houseDecor: String,
    farmland: String,
    farmlandSize: String,
    farmlandCrop: String,
    poorId: String,
    debt: String,
    motorbike: String,
    breadwinner: String,
    income: String,
    expenses: String,
    pocketMoney: String,
    financialRemarks: String,

    // =====================
    // INNER VOICE
    // =====================
    selfDesc: String,
    studyAttitude: String,
    favSubject: String,
    dream: String,
    dreamPlan: String,
    unhappiness: String,
    favGame: String,

    // =====================
    // PROMISES
    // =====================
    promises: promisesSchema,

    // =====================
    // VISITOR
    // =====================
    visitorName: String,
    visitorDate: Date,
    visitorRemarks: String,

    // =====================
    // FOLLOW UP
    // =====================
    followUpDate: Date,
    followUpBy: String,
    followUpType: String,

    // =====================
    // EXAM RESULTS
    // =====================
    examResult: [
      {
        subName: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        marksObtained: { type: Number, default: 0 },
      },
    ],

    // =====================
    // ATTENDANCE
    // =====================
    attendance: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present","Absent"], required: true },
        subName: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
      },
    ],

    // =====================
    // BUDGET & MATERIALS
    // =====================
    budget: { type: Number, default: null },
    materials: [
      {
        item: { type: String, required: true },
        cost: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
