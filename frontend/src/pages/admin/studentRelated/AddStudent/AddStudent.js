import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createStudent } from "../../../../redux/studentRelated/studentHandle";
import { getAllDonors } from "../../../../redux/donorRelated/donorHandle";
import { getAllSchools } from "../../../../redux/schoolRelated/schoolHandle";
import { getAllRegions } from "../../../../redux/regionRelated/regionHandle";
import { getAllGrades } from "../../../../redux/gradeRelated/gradeHandle";


import "../AddStudent/AddStudent.css";
import { provinceDistricts } from "../../../../data/nepalLocations";


const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schools = useSelector((state) => state.school?.schools || []);
  const regions = useSelector((state) => state.region?.regions || []);
  const grades = useSelector((state) => state.grade?.grades || []);

  const { donorsList } = useSelector((state) => state.donor);

  const { loading, response, error, statestatus } = useSelector(
    (state) => state.student
  );

  const [formData, setFormData] = useState({
    // Section 1: Student & Family
    name: "",
    gender: "",
    dob: "",
    age: "",
    address: "",
    province: "",
    district: "",
    phone: "",
    currentAddress: "",
    school: "",
    gradeName: "",
    region: "",

    healthStatus: "",
    healthSpecify: "",

    maritalStatus: "",
    maritalSpecify: "",

    fatherName: "",
    fatherDob: "",
    fatherAge: "",
    fatherOccupation: "",
    fatherHealth: "",
    fatherHealthSpecify: "",

    motherName: "",
    motherDob: "",
    motherAge: "",
    motherOccupation: "",
    motherHealth: "",
    motherHealthSpecify: "",

    remarks: "",

    

    // Section 2: Genogram
    profilePic: null,
    studentPic: null,
    familyPhoto: null,
    housePhoto: null,

    siblings: [
      {
        name: "",
        age: "",
        grade: "",
        school: "",
      },
    ],

    // Section 3: Guardian
    guardianName: "",
    guardianDob: "",
    guardianAge: "",
    guardianRelation: "",
    guardianHealth: "",
    guardianHealthSpecify: "",
    guardianOccupation: "",
    guardianRemarks: "",

    // Section 4: Academic
    studyStatus: "",
    schoolName: "",
    studentId: "",
    clothingSize: "",
    academicResult: "",
    achievements: "",
    challenges: "",
    distance: "",
    academicRemarks: "",

    // Section 5: Financial
    houseBelong: "",
    houseSize: "",
    houseDecor: "",
    farmland: "",
    farmlandSize: "",
    farmlandCrop: "",
    poorId: "",
    debt: "",
    motorbike: "",
    breadwinner: "",
    income: "",
    expenses: "",
    pocketMoney: "",
    financialRemarks: "",

    // Section 6: Inner Voice
    selfDesc: "",
    studyAttitude: "",
    favSubject: "",
    dream: "",
    dreamPlan: "",
    unhappiness: "",
    favGame: "",

    // Section 7: Promises
    promises: {
      studyHard: false,
      writeLetters: false,
      volunteer: false,
    },

    // Section 8: Donors
    donors: [],

    // Section 9: Visitor
    visitorName: "",
    visitorDate: "",
    visitorRemarks: "",

    // Section 10: Follow Up
    followUpDate: "",
    followUpBy: "",
    followUpType: "",
  });

  useEffect(() => {
    dispatch(getAllDonors());
    dispatch(getAllSchools());
    dispatch(getAllRegions());
    dispatch(getAllGrades());
  }, [dispatch]);

  useEffect(() => {
    if (statestatus === "added") {
      navigate("/Admin/students");
    }
  }, [statestatus, navigate]);


  // Age calculator

  const calculateAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age.toString();
};

  // age updater for DOB fields  

  const updateAgeField = (dobField, ageField, value) => {
  setFormData((prev) => ({
    ...prev,
    [dobField]: value,
    [ageField]: calculateAge(value),
  }));
  };
  

  
  const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      promises: {
        ...formData.promises,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleDonorToggle = (donorId) => {
    let newDonors = [...formData.donors];

    newDonors = newDonors.includes(donorId)
      ? newDonors.filter((id) => id !== donorId)
      : [...newDonors, donorId];

    setFormData({
      ...formData,
      donors: newDonors,
    });
  };

  

  // Siblings

  const addSibling = () => {
  setFormData({
    ...formData,
    siblings: [
      ...formData.siblings,
      {
        name: "",
        age: "",
        grade: "",
        school: "",
      },
    ],
  });
};

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...formData.siblings];

    updatedSiblings[index][field] = value;

    setFormData({
      ...formData,
      siblings: updatedSiblings,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((val, i) => {
          if (typeof val === "object") {
            Object.keys(val).forEach((subKey) => {
              data.append(`${key}[${i}][${subKey}]`, val[subKey]);
            });
          } else {
            data.append(`${key}[${i}]`, val);
          }
        });
      } else if (typeof formData[key] === "object" && formData[key] !== null) {
        Object.keys(formData[key]).forEach((subKey) => {
          data.append(`${key}[${subKey}]`, formData[key][subKey]);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(createStudent(data));
  };

  return (
    <Container maxWidth={false} className="add-student-container">
      <Paper className="add-student-paper">
        <Typography variant="h5" gutterBottom>
          KARUNA CARE STUDENT QUESTIONNAIRE
        </Typography>

        <form onSubmit={handleSubmit} className="add-student-form">
          <Grid container spacing={2}>
            {/* ================= SECTION 1 ================= */}
<Grid item xs={12}>
  <Paper elevation={2} sx={{ padding: 3, marginBottom: 3 }}>
    <Typography
      variant="h6"
      className="add-student-section-title"
      gutterBottom
    >
      1. Sponsored Student & Family Condition
    </Typography>

    <Grid container spacing={2}>
      {/* Student Basic Info */}

      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Student Basic Information
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Student Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          select
          label="Gender"
          name="gender"
          fullWidth
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={6}>
  <TextField
    type="date"
    label="Date of Birth"
    name="dob"
    fullWidth
    value={formData.dob}
    InputLabelProps={{ shrink: true }}
    onChange={(e) =>
  updateAgeField("dob", "age", e.target.value)
}
  />
</Grid>

      <Grid item xs={6}>
        <TextField
          label="Age"
          name="age"
          type="text"
          inputProps={{ min: 1, step: 1 }}
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
      </Grid>



   {/* School Dropdown */}

<Grid item xs={6}>
  <TextField
    select
    label="School"
    name="school"
    fullWidth
    value={formData.school || ""}
    onChange={handleChange}
  >
    {schools && schools.map((s) => (
      <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
    ))}
  </TextField>
</Grid>

                  

{/* Region Dropdown */}
<Grid item xs={6}>
  <TextField
    select
    label="Region"
    name="region"
    fullWidth
    value={formData.region || ""}
    onChange={handleChange}
  >
    {regions && regions.map((r) => (
      <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>
    ))}
  </TextField>
</Grid>
                  

{/* Grade Dropdown */}
<Grid item xs={6}>
  <TextField
    select
    label="Grade"
    name="gradeName"
    fullWidth
    value={formData.gradeName || ""}
    onChange={handleChange}
  >
    {grades && grades.map((g) => (
      <MenuItem key={g._id} value={g._id}>{g.gradeName}</MenuItem>
    ))}
  </TextField>
</Grid>


      {/* Province */}

      <Grid item xs={6}>
        <TextField
          select
          label="Province"
          name="province"
          value={formData.province}
          fullWidth
          onChange={(e) => {
            setFormData({
              ...formData,
              province: e.target.value,
              district: "",
            });
          }}
        >
          {Object.keys(provinceDistricts).map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* District */}

      <Grid item xs={6}>
        <TextField
          select
          label="District"
          name="district"
          value={formData.district}
          fullWidth
          disabled={!formData.province}
          onChange={handleChange}
        >
          {formData.province &&
            provinceDistricts[formData.province].map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
        </TextField>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Phone Number"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Current Address"
          name="currentAddress"
          fullWidth
          value={formData.currentAddress}
          onChange={handleChange}
        />
      </Grid>

      {/* Marital Status */}

      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginTop: 2 }}
        >
          Parent Information
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          select
          label="Parent's Marital Status"
          name="maritalStatus"
          fullWidth
          value={formData.maritalStatus}
          onChange={handleChange}
        >
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Separated">Separated</MenuItem>
          <MenuItem value="Widowed">Widowed</MenuItem>
          <MenuItem value="Single Parent">Single Parent</MenuItem>
        </TextField>
      </Grid>

      {/* Father Details */}

      <Grid item xs={12}>
        <Typography variant="subtitle2" fontWeight="bold">
          Father's Information
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Father's Name"
          name="fatherName"
          fullWidth
          value={formData.fatherName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
  <TextField
    type="date"
    label="Father DOB"
    name="fatherDob"
    fullWidth
    value={formData.fatherDob}
    InputLabelProps={{ shrink: true }}
    onChange={(e) =>
  updateAgeField("fatherDob", "fatherAge", e.target.value)
}
  />
                  </Grid>
                  
                  {/* Father's age */}

                  <Grid item xs={4}>
  <TextField
    label="Father Age"
    name="fatherAge"
    type="number"
    fullWidth
    value={formData.fatherAge}
    onChange={handleChange}
  />
</Grid>



      <Grid item xs={4}>
        <TextField
          label="Father Occupation"
          name="fatherOccupation"
          fullWidth
          value={formData.fatherOccupation}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          select
          label="Father Health Status"
          name="fatherHealth"
          fullWidth
          value={formData.fatherHealth}
          onChange={handleChange}
        >
          <MenuItem value="Healthy">Healthy</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
          <MenuItem value="Disabled">Disabled</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Specify Father's Health Condition"
          name="fatherHealthSpecify"
          fullWidth
          value={formData.fatherHealthSpecify}
          onChange={handleChange}
        />
      </Grid>

      {/* Mother Details */}

      <Grid item xs={12}>
        <Typography variant="subtitle2" fontWeight="bold">
          Mother's Information
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Mother's Name"
          name="motherName"
          fullWidth
          value={formData.motherName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
  <TextField
    type="date"
    label="Mother DOB"
    name="motherDob"
    fullWidth
    value={formData.motherDob}
    InputLabelProps={{ shrink: true }}
onChange={(e) =>
  updateAgeField("motherDob", "motherAge", e.target.value)
}
  />
                  </Grid>
                  
                  <Grid item xs={4}>
  <TextField
    label="Mother Age"
    name="motherAge"
    type="number"
    fullWidth
    value={formData.motherAge}
    onChange={handleChange}
  />
</Grid>

      <Grid item xs={4}>
        <TextField
          label="Mother Occupation"
          name="motherOccupation"
          fullWidth
          value={formData.motherOccupation}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          select
          label="Mother Health Status"
          name="motherHealth"
          fullWidth
          value={formData.motherHealth}
          onChange={handleChange}
        >
          <MenuItem value="Healthy">Healthy</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
          <MenuItem value="Disabled">Disabled</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Specify Mother's Health Condition"
          name="motherHealthSpecify"
          fullWidth
          value={formData.motherHealthSpecify}
          onChange={handleChange}
        />
      </Grid>

      {/* Remarks */}

      <Grid item xs={12}>
        <TextField
          label="Remarks"
          name="remarks"
          multiline
          rows={4}
          fullWidth
          value={formData.remarks}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  </Paper>
</Grid>
            {/* SECTION 2 */}
            <Grid item xs={12}>
              <Typography className="add-student-section-title">
                Genogram of Family Member
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <label>Passport Size Photo</label>
              <input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Student Picture</label>
              <input
                type="file"
                name="studentPic"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Family Photo</label>
              <input
                type="file"
                name="familyPhoto"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>House Photo</label>
              <input
                type="file"
                name="housePhoto"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Siblings Detail
              </Typography>
            </Grid>
{formData.siblings.map((sibling, i) => (
  <Grid
    container
    spacing={2}
    key={i}
    className="sibling-row"
    sx={{ marginBottom: 2 }}
  >
    <Grid item xs={3}>
      <TextField
        label="Name"
        value={sibling.name}
        onChange={(e) =>
          handleSiblingChange(i, "name", e.target.value)
        }
        fullWidth
      />
    </Grid>

    <Grid item xs={3}>
      <TextField
        label="Age"
        type="number"
        value={sibling.age}
        onChange={(e) =>
          handleSiblingChange(i, "age", e.target.value)
        }
        fullWidth
      />
    </Grid>

    <Grid item xs={3}>
      <TextField
        label="Grade"
        value={sibling.grade}
        onChange={(e) =>
          handleSiblingChange(i, "grade", e.target.value)
        }
        fullWidth
      />
    </Grid>

    <Grid item xs={3}>
      <TextField
        label="School Name"
        value={sibling.school}
        onChange={(e) =>
          handleSiblingChange(i, "school", e.target.value)
        }
        fullWidth
      />
    </Grid>
  </Grid>
))}

<Grid item xs={12}>
  <Button
    variant="outlined"
    onClick={addSibling}
  >
    + Add Another Sibling
  </Button>
</Grid>
          {/* ================= SECTION 3 ================= */}

<Grid item xs={12}>
  <Paper elevation={2} sx={{ padding: 3, marginBottom: 3 }}>
    <Typography
      variant="h6"
      className="add-student-section-title"
      gutterBottom
    >
      3. Guardian Information (Only for Orphan Student)
    </Typography>

    <Grid   item
  xs={12}
  container
  spacing={2}>

      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Guardian Details
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Guardian Name"
          name="guardianName"
          fullWidth
          value={formData.guardianName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          type="date"
          label="Guardian DOB"
          name="guardianDob"
          fullWidth
          value={formData.guardianDob}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            updateAgeField("guardianDob", "guardianAge", e.target.value)
          }
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Guardian Age"
          name="guardianAge"
          type="number"
          fullWidth
          value={formData.guardianAge}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Relation with Student"
          name="guardianRelation"
          fullWidth
          value={formData.guardianRelation}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Guardian Occupation"
          name="guardianOccupation"
          fullWidth
          value={formData.guardianOccupation}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          select
          label="Guardian Health Status"
          name="guardianHealth"
          fullWidth
          value={formData.guardianHealth}
          onChange={handleChange}
        >
          <MenuItem value="Healthy">Healthy</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
          <MenuItem value="Disabled">Disabled</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Specify Guardian Health Condition"
          name="guardianHealthSpecify"
          fullWidth
          value={formData.guardianHealthSpecify}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Guardian Remarks"
          name="guardianRemarks"
          multiline
          rows={4}
          fullWidth
          value={formData.guardianRemarks}
          onChange={handleChange}
        />
      </Grid>

    </Grid>
  </Paper>
</Grid>




            {/* SECTION 7 */}
<Grid item xs={12}>
  <Typography className="add-student-section-title">
    Make Promise (Yes/No)
  </Typography>

  <FormGroup className="checkbox-group">
    <FormControlLabel
      control={
        <Checkbox
          name="studyHard"
          checked={formData.promises.studyHard}
          onChange={handleCheckboxChange}
        />
      }
      label="I am willing to study hard."
    />

    <FormControlLabel
      control={
        <Checkbox
          name="writeLetters"
          checked={formData.promises.writeLetters}
          onChange={handleCheckboxChange}
        />
      }
      label="I am willing to write letters to my sponsor."
    />

    <FormControlLabel
      control={
        <Checkbox
          name="volunteer"
          checked={formData.promises.volunteer}
          onChange={handleCheckboxChange}
        />
      }
      label="I am willing to help other children when I grow up."
    />
  </FormGroup>
</Grid>

          {/* SECTION 8 */}
          <Grid item xs={12}>
            <Typography className="add-student-section-title">
              Assign Donors
            </Typography>

            <FormGroup className="checkbox-group">
              {donorsList &&
                donorsList.map((donor) => (
                  <FormControlLabel
                    key={donor._id}
                    control={
                      <Checkbox
                        checked={formData.donors.includes(donor._id)}
                        onChange={() => handleDonorToggle(donor._id)}
                      />
                    }
                    label={donor.name}
                  />
                ))}
            </FormGroup>
          </Grid>

          {/* SUBMIT */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>

          {/* ALERTS */}
          <Grid item xs={12} className="feedback-alert">
            {response && (
              <Alert severity="success">{response}</Alert>
            )}

            {error && (
              <Alert severity="error">{error}</Alert>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
);
};

export default AddStudent;