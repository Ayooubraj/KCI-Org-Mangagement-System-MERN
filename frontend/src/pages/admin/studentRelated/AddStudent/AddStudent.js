// import React, { useState, useEffect } from "react";
// import {
//   Container, Paper, Typography, Grid, TextField, Button, MenuItem,
//   FormGroup, FormControlLabel, Checkbox, Alert
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createStudent } from "../../../../redux/studentRelated/studentHandle";
// import { getAllDonors } from "../../../../redux/donorRelated/donorHandle";
// import "../AddStudent/AddStudent.css";

// const AddStudent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { donorsList } = useSelector((state) => state.donor);
//   const { loading, response, error, statestatus } = useSelector((state) => state.student);

//   const [formData, setFormData] = useState({
//     firstname: "",
//     surname: "",
//     dob: "",
//     age: "",
//     gender: "",
//     address: "",
//     phone: "",
//     currentAddress: "",
//     healthStatus: "",
//     healthSpecify: "",
//     maritalStatus: "",
//     maritalSpecify: "",
//     fatherName: "",
//     fatherDob: "",
//     fatherOccupation: "",
//     fatherHealth: "",
//     fatherHealthSpecify: "",
//     motherName: "",
//     motherDob: "",
//     motherOccupation: "",
//     motherHealth: "",
//     motherHealthSpecify: "",
//     remarks: "",
//     siblings: [{ name: "", age: "", grade: "", school: "" }],
//     promises: { studyHard: false, writeLetters: false, volunteer: false },
//     profilePic: null,
//     studentPic: null,
//     familyPhoto: null,
//     birthCertificate: null,
//     fatherCitizenship: null,
//     motherCitizenship: null,
//     otherDocs: null,
//     donors: []
//   });

//   useEffect(() => {
//     dispatch(getAllDonors());
//   }, [dispatch]);

//   useEffect(() => {
//     if (statestatus === "added") {
//       navigate("/Admin/students");
//     }
//   }, [statestatus, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };

//   const handleCheckboxChange = (e) => {
//     setFormData({
//       ...formData,
//       promises: { ...formData.promises, [e.target.name]: e.target.checked }
//     });
//   };

//   const handleDonorToggle = (donorId) => {
//     let newDonors = [...formData.donors];
//     if (newDonors.includes(donorId)) {
//       newDonors = newDonors.filter((id) => id !== donorId);
//     } else {
//       newDonors.push(donorId);
//     }
//     setFormData({ ...formData, donors: newDonors });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach((val, i) => {
//           if (typeof val === "object") {
//             Object.keys(val).forEach((subKey) =>
//               data.append(`${key}[${i}][${subKey}]`, val[subKey])
//             );
//           } else {
//             data.append(`${key}[${i}]`, val);
//           }
//         });
//       } else if (typeof formData[key] === "object" && formData[key] !== null) {
//         Object.keys(formData[key]).forEach((subKey) =>
//           data.append(`${key}[${subKey}]`, formData[key][subKey])
//         );
//       } else {
//         data.append(key, formData[key]);
//       }
//     });
//     dispatch(createStudent(data));
//   };

//   return (
//     <Container className="add-student-container">
//       <Paper className="add-student-paper">
//         <Typography variant="h5" gutterBottom>
//           KARUNA CARE STUDENT QUESTIONNAIRE
//         </Typography>
//         <form onSubmit={handleSubmit} className="add-student-form">
//           <Grid container spacing={2}>
//             {/* Profile Picture */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Profile Picture (Top)</Typography>
//               <input type="file" name="profilePic" onChange={handleFileChange} />
//             </Grid>

//             {/* Basic Info */}
//             <Grid item xs={6}><TextField label="First Name" name="firstname" fullWidth onChange={handleChange} /></Grid>
//             <Grid item xs={6}><TextField label="Surname" name="surname" fullWidth onChange={handleChange} /></Grid>
//             <Grid item xs={6}><TextField type="date" label="DOB" name="dob" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} /></Grid>
//             <Grid item xs={6}><TextField label="Age" name="age" fullWidth onChange={handleChange} /></Grid>
//             <Grid item xs={6}>
//               <TextField select label="Gender" name="gender" fullWidth onChange={handleChange}>
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>
//             </Grid>

//             {/* Promises */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Promises</Typography>
//               <FormControlLabel control={<Checkbox name="studyHard" onChange={handleCheckboxChange} />} label="I am willing to study hard." />
//               <FormControlLabel control={<Checkbox name="writeLetters" onChange={handleCheckboxChange} />} label="I am willing to write letters to my sponsor." />
//               <FormControlLabel control={<Checkbox name="volunteer" onChange={handleCheckboxChange} />} label="I am willing to join the volunteer group." />
//             </Grid>

//             {/* Donor Assignment */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Assign Donors</Typography>
//               <FormGroup>
//                 {donorsList && donorsList.map((donor) => (
//                   <FormControlLabel
//                     key={donor._id}
//                     control={
//                       <Checkbox
//                         checked={formData.donors.includes(donor._id)}
//                         onChange={() => handleDonorToggle(donor._id)}
//                       />
//                     }
//                     label={donor.name}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>

//             {/* Submit */}
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>

//         {/* Feedback */}
//         {response && <Alert severity="success">{response}</Alert>}
//         {error && <Alert severity="error">{error}</Alert>}
//       </Paper>
//     </Container>
//   );
// };

// export default AddStudent;

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

import "../AddStudent/AddStudent.css";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    phone: "",
    currentAddress: "",

    healthStatus: "",
    healthSpecify: "",

    maritalStatus: "",
    maritalSpecify: "",

    fatherName: "",
    fatherDob: "",
    fatherOccupation: "",
    fatherHealth: "",
    fatherHealthSpecify: "",

    motherName: "",
    motherDob: "",
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
  }, [dispatch]);

  useEffect(() => {
    if (statestatus === "added") {
      navigate("/Admin/students");
    }
  }, [statestatus, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            {/* SECTION 1 */}
            <Grid item xs={12}>
              <Typography className="add-student-section-title">
                Sponsored Student & Family Condition
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
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
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Age"
                name="age"
                type="number"
                inputProps={{ min: 0, step: 1 }}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Current Address"
                name="currentAddress"
                fullWidth
                onChange={handleChange}
              />
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

